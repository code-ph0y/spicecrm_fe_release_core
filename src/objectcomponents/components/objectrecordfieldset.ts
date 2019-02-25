/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import {metadata} from '../../services/metadata.service';
import {model} from '../../services/model.service';
import {view} from '../../services/view.service';

@Component({
    selector: 'object-record-fieldset',
    templateUrl: './src/objectcomponents/templates/objectrecordfieldset.html'
})
export class ObjectRecordFieldset implements OnInit {

    @Input() private fieldset: string = '';
    @Input() private fieldpadding: string = 'xx-small';
    @Input() private fielddisplayclass: string = 'slds-has-divider--bottom slds-p-vertical--x-small spicecrm-fieldminheight';
    @Input() private direction: string = 'horizontal';

    private fieldsetitems: any[] = [];
    private numberOfColumns: number = 0; // in grid

    constructor(private metadata: metadata, private model: model, private view: view) {
    }

    public ngOnInit() {
        this.fieldsetitems = this.metadata.getFieldSetItems(this.fieldset);
        for (let item of this.fieldsetitems) {
            this.numberOfColumns = this.numberOfColumns + (item.fieldconfig.width ? item.fieldconfig.width * 1 : (item.fieldconfig.width = 1));
        }
        if (!this.renderVertical && this.numberOfColumns > 8) console.warn('wrong fieldset grid (' + this.fieldset + ')');
    }

    get renderVertical() {
        return this.direction == 'vertical' ? true : false;
    }

    private isField(fieldsetitem) {
        return fieldsetitem.field ? true : false;
    }

    private sizeClass(i) {
        // render vertical ... none
        if (this.renderVertical) return '';

        // in case of small view sioze 1-of-1
        if (this.view.size == 'small') return 'slds-size--1-of-1';

        // regular -- calulate grid
        return 'slds-size--' + this.fieldsetitems[i].fieldconfig.width + '-of-' + this.numberOfColumns;
    }
}

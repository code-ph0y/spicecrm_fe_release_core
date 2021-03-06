/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {Component, Output, EventEmitter, ElementRef, Renderer2} from "@angular/core";
import {backend} from "../../services/backend.service";
import {language} from "../../services/language.service";
import {configurationService} from "../../services/configuration.service";

@Component({
    selector: "system-googleplaces-search",
    templateUrl: "./src/systemcomponents/templates/systemgoogleplacessearch.html"
})
export class SystemGoogleplacesSearch {
    @Output() private address: EventEmitter<any> = new EventEmitter<any>();

    private isenabled: boolean = false;
    private autocompletesearchterm: string = '';
    private autocompleteTimeout: any = undefined;
    private autocompleteResults: Array<any> = [];
    private autocompleteClickListener: any = undefined;
    private displayAutocompleteResults: boolean = false;

    constructor(private language: language, private backend: backend, private configuration: configurationService, private elementref: ElementRef, private renderer: Renderer2) {
        let googleAPIConfig = this.configuration.getCapabilityConfig('google_api');
        if (googleAPIConfig.key && googleAPIConfig.key != '') {
            this.isenabled = true;
        }
    }

    get searchterm() {
        return this.autocompletesearchterm;
    }

    set searchterm(value) {
        this.autocompletesearchterm = value;

        // set the timeout for the search
        if (this.autocompleteTimeout) {
            window.clearTimeout(this.autocompleteTimeout);
        }
        this.autocompleteTimeout = window.setTimeout(() => this.doAutocomplete(), 500);
    }

    private onSearchFocus() {
        if (this.autocompletesearchterm.length > 1 && this.autocompleteResults.length > 0) {
            this.openSearchResults()
        }
    }

    private openSearchResults() {
        this.displayAutocompleteResults = true;
        this.autocompleteClickListener = this.renderer.listen('document', 'click', (event) => this.onClick(event));
    }

    public onClick(event: MouseEvent): void {
        const clickedInside = this.elementref.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.closeSearchResutls();
        }
    }

    private closeSearchResutls() {
        if (this.autocompleteClickListener) {
            this.autocompleteClickListener();
        }
        this.displayAutocompleteResults = false;
    }

    private doAutocomplete() {
        if (this.autocompletesearchterm.length > 5) {
            this.backend.getRequest('googleapi/places/autocomplete/' + this.autocompletesearchterm).subscribe((res: any) => {
                if (res.predictions && res.predictions.length > 0) {
                    this.autocompleteResults = res.predictions;
                    this.openSearchResults()
                } else {
                    this.autocompleteResults = [];
                    this.closeSearchResutls();
                }
            });
        }
    }

    private getAddressDetail(placeid) {
        this.displayAutocompleteResults = false;
        this.autocompletesearchterm = '';
        this.backend.getRequest('googleapi/places/' + placeid).subscribe((res: any) => {
            let address = {
                street: res.address.street,
                city: res.address.city,
                postalcode: res.address.postalcode,
                state: res.address.state,
                country: res.address.country,
                latitude: parseFloat(res.address.location.lat),
                longitude: parseFloat(res.address.location.lng)
            };
            this.address.emit(address);
        });
    }
}

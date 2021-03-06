/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {CommonModule} from "@angular/common";
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    EventEmitter,
    Injectable,
    Input,
    NgModule,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes, Router, ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

import {Subject, Observable} from "rxjs";

import {loginService, loginCheck} from "../../services/login.service";
import {metadata, aclCheck} from "../../services/metadata.service";
import {model} from "../../services/model.service";
import {modal} from "../../services/modal.service";
import {modellist} from "../../services/modellist.service";
import {relatedmodels} from "../../services/relatedmodels.service";
import {modelutilities} from "../../services/modelutilities.service";
import {helper} from "../../services/helper.service";
import {language} from "../../services/language.service";
import {broadcast} from "../../services/broadcast.service";
import {navigation} from "../../services/navigation.service";
import {backend} from "../../services/backend.service";
import {session} from "../../services/session.service";
import {footer} from "../../services/footer.service";
import {assistant} from "../../services/assistant.service";
import {view} from "../../services/view.service";
import {popup} from "../../services/popup.service";
import {toast} from "../../services/toast.service";
import {fts} from "../../services/fts.service";
import {configurationService} from "../../services/configuration.service";
import {VersionManagerService} from "../../services/versionmanager.service";

import {DirectivesModule} from "../../directives/directives";
import {GlobalComponents} from "../../globalcomponents/globalcomponents";
import {ObjectComponents} from "../../objectcomponents/objectcomponents";
import {ObjectFields} from "../../objectfields/objectfields";
import {SystemComponents} from "../../systemcomponents/systemcomponents";

import /*embed*/ {mailboxesEmails} from "./services/mailboxesemail.service";

import /*embed*/ {MailboxManager} from "./components/mailboxmanager";
import /*embed*/ {MailboxManagerHeader} from "./components/mailboxmanagerheader";
import /*embed*/ {MailboxManagerEmails} from "./components/mailboxmanageremails";
import /*embed*/ {MailboxManagerEmail} from "./components/mailboxmanageremail";
import /*embed*/ {MailboxmanagerEmailDetails} from "./components/mailboxmanageremaildetails";
import /*embed*/ {MailboxEmailToLeadButton} from "./components/mailboxemailtoleadbutton";
import /*embed*/ {MailboxEmailToLeadModal} from "./components/mailboxemailtoleadmodal";
import /*embed*/ {MailboxEmailToLeadEmailText} from "./components/mailboxemailtoleademailtext";
import /*embed*/ { MailboxesDashlet } from "./components/mailboxesdashlet"

@NgModule({
    declarations: [
        MailboxManager,
        MailboxManagerHeader,
        MailboxManagerEmails,
        MailboxManagerEmail,
        MailboxmanagerEmailDetails,
        MailboxEmailToLeadButton,
        MailboxEmailToLeadModal,
        MailboxEmailToLeadEmailText,
        MailboxesDashlet
    ],
    imports: [
        CommonModule,
        FormsModule,
        ObjectFields,
        GlobalComponents,
        ObjectComponents,
        SystemComponents,
        DirectivesModule,
    ],
})
export class ModuleMailboxes {
    readonly version = "1.0";
    readonly build_date = "/*build_date*/";

    constructor(private vms: VersionManagerService) {
        this.vms.registerModule(this);
    }
}
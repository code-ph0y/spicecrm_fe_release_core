/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {CommonModule} from '@angular/common';
import {FormsModule}   from '@angular/forms';
import {AfterViewInit, OnInit, OnDestroy, ComponentFactoryResolver, Component, NgModule, Injectable, ViewChild, ViewContainerRef, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

import {Subject, Observable} from 'rxjs';
import {CanActivate}    from '@angular/router';

import {session} from '../services/session.service';
import {metadata} from '../services/metadata.service';
import {modal} from '../services/modal.service';
import {modelutilities} from '../services/modelutilities.service';
import {backend} from '../services/backend.service';
import {navigation} from '../services/navigation.service';
import {language} from '../services/language.service';
import {configurationService} from '../services/configuration.service';
import {userpreferences} from '../services/userpreferences.service';
import {footer} from '../services/footer.service';
import {toast} from '../services/toast.service';
import {broadcast} from '../services/broadcast.service';
import {VersionManagerService} from '../services/versionmanager.service';
import { RouterModule, Routes, Router } from '@angular/router';
import {loginCheck } from '../services/login.service';
import {DirectivesModule} from "../directives/directives";
import {SystemComponents} from '../systemcomponents/systemcomponents';
import {relatedmodels} from '../services/relatedmodels.service';
import {model} from '../services/model.service';
import {view} from '../services/view.service';

import /*embed*/ {administrationconfigurator} from './services/administrationconfigurator.service'
import /*embed*/ {ftsconfiguration} from './services/ftsconfiguration.service'
import /*embed*/ {dictionary} from './services/dictionary.service'

import /*embed*/ { AdministrationMenu } from './components/administrationmenu';
import /*embed*/ { AdministrationMenuRouteItem } from './components/administrationmenurouteitem';
import /*embed*/ { AdministrationConfigurator } from './components/administrationconfigurator';
import /*embed*/ { AdministrationConfiguratorItem } from './components/administrationconfiguratoritem';
import /*embed*/ { AdministrationConfiguratorItemRole } from './components/administrationconfiguratoritemrole';
import /*embed*/ { AdministrationQuotaManager } from './components/administrationquotamanager';
import /*embed*/ { AdministrationQuotaManagerField } from './components/administrationquotamanagerfield';

import /*embed*/ { AdministrationFTSManager } from './components/administrationftsmanager';
import /*embed*/ { AdministrationFTSManagerFields } from './components/administrationftsmanagerfields';
import /*embed*/ { AdministrationFTSManagerDetails } from './components/administrationftsmanagerdetails';
import /*embed*/ { AdministrationFTSManagerFieldsAdd } from './components/administrationftsmanagerfieldsadd';
import /*embed*/ { AdministrationFTSStats } from './components/administrationftsstats';

import /*embed*/ { AdministrationSysTrashcanManager } from './components/administrationsystrashcanmanager';
import /*embed*/ { AdministrationSysTrashcanRecover } from './components/administrationsystrashcanrecover';

import /*embed*/ { AdministrationDictRepair } from './components/administrationdictrepair';

import /*embed*/ { AdministrationConfigEditor } from './components/administrationconfigeditor';

import /*embed*/ { AdministrationSchedulerJobsEnum } from './components/administrationschedulerjobsenum';
import /*embed*/ { AdministrationSchedulerJobLog } from './components/administrationschedulerjoblog';
import /*embed*/ { AdministrationSchedulerRunButton } from './components/administrationschedulerrunbutton';
import /*embed*/ { AdministrationSchedulerScheduleButton } from './components/administrationschedulerschedulebutton';

import /*embed*/ { AdministrationDictionaryManager, AdministrationDictionaryManagerItem, AdministrationDictionaryManagerItemField } from './components/administrationdictionarymanager';
import /*embed*/ {VersionControllerComponent} from "./components/versioncontroller";


@Component({
    selector: 'administration-main',
    template: '<div administration-menu></div>'
})
export class AdministrationMain {}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SystemComponents,
        DirectivesModule,
        RouterModule.forChild([
            { path: '', component: AdministrationMain}
        ])
    ],
    declarations: [
        AdministrationMain,
        AdministrationMenu,
        AdministrationMenuRouteItem,
        AdministrationConfigurator,
        AdministrationConfiguratorItem,
        AdministrationConfiguratorItemRole,
        AdministrationQuotaManager,
        AdministrationQuotaManagerField,
        AdministrationFTSManager,
        AdministrationFTSManagerFields,
        AdministrationFTSManagerDetails,
        AdministrationFTSManagerFieldsAdd,
        AdministrationFTSStats,
        AdministrationDictionaryManager,
        AdministrationDictionaryManagerItem,
        AdministrationDictionaryManagerItemField,
        AdministrationSysTrashcanManager,
        AdministrationSysTrashcanRecover,
        AdministrationDictRepair,
        VersionControllerComponent,
        AdministrationConfigEditor,
        AdministrationSchedulerJobsEnum,
        AdministrationSchedulerJobLog,
        AdministrationSchedulerRunButton,
        AdministrationSchedulerScheduleButton
    ],
    entryComponents: [
        AdministrationMain,
        AdministrationMenu,
        AdministrationConfigurator,
        AdministrationQuotaManager,
        AdministrationQuotaManagerField,
        AdministrationFTSManager,
        AdministrationDictionaryManager,
        AdministrationDictionaryManagerItem,
        AdministrationDictionaryManagerItemField
    ],
    exports: [],

})
export class AdminComponentsModule
{
    readonly version = '1.0';
    readonly build_date = '/*build_date*/';

    constructor(
        private vms:VersionManagerService,
    ) {
        vms.registerModule(this);
    }
}
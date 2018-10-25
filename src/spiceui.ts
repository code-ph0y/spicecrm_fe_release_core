/*
SpiceUI 1.1.0

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BrowserModule, Title} from "@angular/platform-browser";
import {
    NgModule,
    Component,
    SystemJsNgModuleLoader,
    Injectable,
    NgModuleFactory,
    NgModuleFactoryLoader,
    Compiler
} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";


// spicecrm generic modules
import {SystemComponents}      from "./systemcomponents/systemcomponents";
import {GlobalComponents}      from "./globalcomponents/globalcomponents";
import {ObjectComponents} from "./objectcomponents/objectcomponents";


// support browser location strategy
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
// import {AdminComponentsModule, AdministrationMain} from "./admincomponents/admincomponents.module";

// various services we need on global app level
import {configurationService} from "./services/configuration.service";
import {loginService, loginCheck} from "./services/login.service";
import {session} from "./services/session.service";
import {metadata, aclCheck} from "./services/metadata.service";
import {AppDataService} from "./services/appdata.service";
import {MathExpressionCompilerService} from "./services/mathexpressioncompiler";
import {language} from "./services/language.service";
import {recent} from "./services/recent.service";
import {userpreferences} from "./services/userpreferences.service";
import {fts} from "./services/fts.service";
import {loader} from "./services/loader.service";
import {broadcast} from "./services/broadcast.service";
import {dockedComposer} from "./services/dockedcomposer.service";
import {backend} from "./services/backend.service";
import {navigation} from "./services/navigation.service";
import {modelutilities} from "./services/modelutilities.service";
import {toast} from "./services/toast.service";
import {favorite} from "./services/favorite.service";
import {reminder} from "./services/reminder.service";
import {territories} from "./services/territories.service";
import {currency} from "./services/currency.service";
import {footer} from "./services/footer.service";
import {cookie} from "./services/cookie.service";
import {assistant} from "./services/assistant.service";
import {VersionManagerService} from "./services/versionmanager.service";
import {modal} from "./services/modal.service";

// declarations for TS
declare var System: any;
declare var moment: any;
declare global {
    interface Date {
        format(format): string;
    }
};

moment.defaultFormat = "YYYY-MM-DD HH:mm:ss";

@Component({
    selector: "spicecrm",
    template: "<global-header></global-header><div class=\"spiceContent\"><router-outlet></router-outlet></div><global-footer></global-footer>"
})
export class SpiceUI {

}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        SystemComponents,
        GlobalComponents,
        ObjectComponents,
        RouterModule.forRoot(
            [
                {path: "", redirectTo: "/module/Home", pathMatch: "full"},
            ]
        )
    ],
    declarations: [SpiceUI],
    entryComponents: [],
    bootstrap: [SpiceUI],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        backend,
        broadcast,
        navigation,
        session,
        metadata,
        AppDataService,
        aclCheck,
        loginCheck,
        loginService,
        loader,
        configurationService,
        language,
        dockedComposer,
        fts,
        recent,
        SystemJsNgModuleLoader,
        modelutilities,
        toast,
        favorite,
        reminder,
        territories,
        currency,
        footer,
        userpreferences,
        cookie,
        MathExpressionCompilerService,
        assistant,
        VersionManagerService,
        modal,
        Title
    ]
})
export class SpiceUIModule {
    public version = "1.0";
    public build_date = "/*build_date*/";

    constructor(
        public metadata: metadata,
        private vms: VersionManagerService,
    ) {
        this.vms.registerModule(this);
    }
}


// set prod mode
/*
 import {enableProdMode} from "@angular/core";
 enableProdMode();
 */

const platform = platformBrowserDynamic();
platform.bootstrapModule(SpiceUIModule);
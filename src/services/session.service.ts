/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject, Observable} from 'rxjs';
import {CanActivate} from '@angular/router';
import {configurationService} from './configuration.service';
import {loader} from './loader.service';
import {Router} from '@angular/router';

// Taken from https://github.com/killmenot/webtoolkit.md5

interface authDataIf {
    renewPass: boolean;
    sessionId: string;
    loaded: boolean,
    userId: string;
    userName: string;
    first_name: string;
    last_name: string;
    display_name: string;
    email: string;
    password: string;
    admin: boolean;
    dev: boolean;
    portalOnly: boolean;
    googleToken: string;
    userimage: string;
}

@Injectable()
export class session {

    public authData: authDataIf = {
        sessionId: null,
        loaded: false,
        userId: null,
        userName: '',
        first_name: '',
        last_name: '',
        display_name: '',
        email: '',
        password: '',
        admin: false,
        dev: false,
        renewPass: false,
        portalOnly: false,
        googleToken: '',
        userimage: ''
    };

    public footercontainer: any = null;

    // add an observable for the auth data
    private authDataObs: Subject<authDataIf> = new Subject<authDataIf>();
    private authDataObs$: Observable<authDataIf> = this.authDataObs.asObservable();

    public getSessionHeader(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set('OAuth-Token', this.authData.sessionId);
        return headers;
    }

    public setSessionData(key, data) {
        sessionStorage.setItem(
            window.btoa(key + this.authData.sessionId),
            window.btoa(encodeURIComponent(JSON.stringify(data)))
        );
    }

    public getSessionData(key, returnEmptyObject = true) {
        try {
            return JSON.parse(
                decodeURIComponent(
                    window.atob(
                        sessionStorage.getItem(
                            window.btoa(key + this.authData.sessionId)
                        )
                    )
                )
            );
        } catch (e) {
            if (returnEmptyObject) return {};
            else return false;
        }
    }

    public existsData(key: string) {
        try {
            return (
                sessionStorage[window.btoa(key + this.authData.sessionId)] &&
                sessionStorage[window.btoa(key + this.authData.sessionId)].length > 0
            );
        } catch (e) {
            return false;
        }
    }

    public endSession() {
        this.authData.sessionId = null;
        this.authData.userId = null;
        this.authData.loaded = false;
        this.authData.userName = '';
        this.authData.first_name = '';
        this.authData.last_name = '';
        this.authData.display_name = '';
        this.authData.email = '';
        this.authData.userimage = '';
        this.authData.password = '';
        this.authData.admin = false;
        this.authData.dev = false;
        sessionStorage.clear();
    }

    /*
    * getter returns if the logged on user is an admin
     */
    get isAdmin() {
        return this.authData.admin;
    }

    /*
     * getter returns if the logged on user is a developer
     */
    get isDev() {
        return this.authData.dev;
    }

}

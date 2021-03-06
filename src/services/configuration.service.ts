/*
SpiceUI 2018.10.001

Copyright (c) 2016-present, aac services.k.s - All rights reserved.
Redistribution and use in source and binary forms, without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain this copyright and license notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
- If used the SpiceCRM Logo needs to be displayed in the upper left corner of the screen in a minimum dimension of 31x31 pixels and be clearly visible, the icon needs to provide a link to http://www.spicecrm.io
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

import {Injectable, EventEmitter} from '@angular/core';

import {cookie} from './cookie.service';
import {session} from './session.service';

import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
declare var _:any;
@Injectable()
export class configurationService {
kopie:any;
    initialized: boolean = false;
    sites: Array<any> = [];
    data: any = {
        backendUrl: 'proxy',
        backendextensions: {}
    };
    loaded$: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient,
                private cookie: cookie,
                private session: session,
                private router: Router,) {
        /*
         http.get('config.json')
         .subscribe(
         file => {
         this.data = file.json();
         this.getSysinfo();
         }
         );
         */

        let storedSites = localStorage['spiceuisites'];

        if (storedSites) {
            this.sites = JSON.parse(atob(storedSites));

            let selectedsite = this.cookie.getValue('spiceuibackend');
            let siteFound = false;
            this.sites.some(site => {
                if (site.id == selectedsite) {
                    this.setSiteID(site.id);
                    siteFound = true;
                    return true;
                }
            });

            if (!siteFound) {
                this.setSiteID(this.sites[0].id);
            }
        }

        // reload the sites
        http.get('config/sites/')
            .subscribe(
                (data: any) => {

                    let dataObject = data;
                    let sites = dataObject.sites;

                    // if no site is set naviogate to setup screen
                    if (sites.length == 0) {
                        this.router.navigate(['/setup']);
                    }

                    for ( let attrname in dataObject.general ) { this.data[attrname] = dataObject.general[attrname]; }

                    // if multiple are set try to find the proper one
                    if (sites.length > 0) {
                        this.sites = sites;

                        // this.session.setSessionData('sites', sites);
                        localStorage['spiceuisites'] = btoa(JSON.stringify(sites));

                        if (!this.data.id) {
                            let selectedsite = this.cookie.getValue('spiceuibackend');
                            let siteFound = false;
                            this.sites.some(site => {
                                if (site.id == selectedsite) {
                                    this.setSiteID(site.id);
                                    siteFound = true;
                                    return true;
                                }
                            });

                            if (!siteFound) {
                                this.setSiteID(sites[0].id);
                            }
                        }
                    }

                    this.initialized = true;
                }
            );

    }

    setSiteData(data) {
        this.sites.push(data);
        for ( let attrname in data ) { this.data[attrname] = data[attrname]; } // before: this.data = data;
        // this.session.setSessionData('sites', sites);
        localStorage['spiceuisites'] = btoa(JSON.stringify(this.sites));

        this.getSysinfo();
    }

    setSiteID(id) {
        this.sites.some(site => {
            if (site.id == id) {
                for ( let attrname in site ) { this.data[attrname] = site[attrname]; } // before: this.data = site;
                this.cookie.setValue('spiceuibackend', id);
                return true;
            }
        });
        this.getSysinfo();
        return this.data;
    }

    getSiteId() {
        return this.data.id;
    }

    getBackendUrl() {
        return this.data.backendUrl;
    }

    getFrontendUrl() {
        if (typeof this.data.frontendUrl != "undefined")
            return this.data.frontendUrl;
        return "";
    }

    getUser() {
        return this.data.user;
    }

    getPassword() {
        return this.data.password;
    }

    getSysinfo() {
        let sysinfo = this.http.get(this.getBackendUrl() + '/sysinfo');
        sysinfo.subscribe(
            (res: any) => {
                if (res) {
                    var response = res;
                    this.data.languages = response.languages;
                    this.data.backendextensions = response.extensions;
                    this.loaded$.emit(true);
                }
            },
            (err: any) => {
                // this.toast.sendToast('error connecting to Backend', 'error', 'please contact your System administrator');
            });
        return sysinfo;
    }

    checkCapability(capability) {
        return  this.data.backendextensions && this.data.backendextensions.hasOwnProperty(capability);;
    }

    getCapabilityConfig(capability){
        try{
            return (this.data.backendextensions[capability] && this.data.backendextensions[capability].config) ? this.data.backendextensions[capability].config : {}
        } catch(e){
            return {};
        }
    }

    setData(key, data) {
        this.data[key] = data;
    }

    getData(key) {
        return this.data[key] ? this.data[key] : false;
    }
}
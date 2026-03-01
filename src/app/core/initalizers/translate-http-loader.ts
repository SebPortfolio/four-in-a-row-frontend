import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ITranslateResource {
    prefix: string;
    suffix: string;
}

export class TranslateHttpLoader implements TranslateLoader {
    constructor(
        private http: HttpClient,
        private resources: ITranslateResource[]
    ) {}

    public getTranslation(lang: string): Observable<ITranslateResource> {
        // Für jede Ressource (Datei) einen HTTP GET Request bauen
        const requests = this.resources.map(resource => this.http.get(`${resource.prefix}${lang}${resource.suffix}`));

        // Alle Requests parallel ausführen und die Antworten zu einem Objekt zusammenführen
        return forkJoin(requests).pipe(map(response => Object.assign({}, ...response)));
    }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    const rootPath = './assets/texte/';
    const suffix = '.json';
    const resources: ITranslateResource[] = [
        { prefix: rootPath + 'allgemein-', suffix },
        { prefix: rootPath + 'user/user-', suffix },
        { prefix: rootPath + 'user/user-stammdaten-panel-', suffix },
        { prefix: rootPath + 'sprachen-', suffix },
        { prefix: rootPath + 'navbar-', suffix },
        { prefix: rootPath + 'admin/admin-user-overview-', suffix },
        { prefix: rootPath + 'menu/hauptmenu-', suffix },
        { prefix: rootPath + 'menu/general-menu-', suffix },
        // TODO: weitere Übersetzungsdateien hier hinzufügen
    ];

    return new TranslateHttpLoader(http, resources);
}

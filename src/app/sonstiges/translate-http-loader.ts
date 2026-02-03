import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ITranslateResource {
  prefix: string;
  suffix: string;
}

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private resources: ITranslateResource[]) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getTranslation(lang: string): Observable<any> {
    // Für jede Ressource (Datei) einen HTTP GET Request bauen
    const requests = this.resources.map(resource => this.http.get(`${resource.prefix}${lang}${resource.suffix}`));

    // Alle Requests parallel ausführen und die Antworten zu einem Objekt zusammenführen
    return forkJoin(requests).pipe(map(response => Object.assign({}, ...response)));
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  const resources: ITranslateResource[] = [
    { prefix: './assets/texte/allgemein-', suffix: '.json' },
    // TODO: weitere Übersetzungsdateien hier hinzufügen
  ];

  return new TranslateHttpLoader(http, resources);
}

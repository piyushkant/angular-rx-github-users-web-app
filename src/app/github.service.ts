import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface GitHubUser {
  html_url: string;
  avatar_url: string;
  login: string;
  score: string;
}

export class GitHubService {
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getGitHubData(_searchTerm): Observable<GitHubUser> {
    return this._http.get<GitHubUser>('https://api.github.com/search/users?q=' + _searchTerm);
  }
}

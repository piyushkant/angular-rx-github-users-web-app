import {Component, OnInit} from '@angular/core';
import {GitHubService} from './github.service';
import {filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [GitHubService]
})

export class AppComponent implements OnInit {
    searchControl = new FormControl();
    isLoading = false;

    users = [];

    // tslint:disable-next-line:variable-name
    constructor(private _githubService: GitHubService) {
    }

    // tslint:disable-next-line:typedef
    ngOnInit() {
        this.searchControl
            .valueChanges
            .pipe(filter(text => text.length >= 3), debounceTime(400), distinctUntilChanged())
            .subscribe(value => {
                this.isLoading = true;
                this._githubService.getGitHubData(value).subscribe(data => {
                    this.isLoading = false;
                    this.users = data.items;
                });
            });
    }
}

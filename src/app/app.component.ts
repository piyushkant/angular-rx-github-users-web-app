import {Component, OnInit} from '@angular/core';
import {GitHubService} from './github.service';

@Component({
    selector: 'app-root',
    template: `
        <div *ngIf="isLoading"><i class="fa fa-spinner fa-spin fa-3x"></i></div>
        <h3>GitHub User Results</h3>
        <div *ngIf="isLoading"><i class="fa fa-spinner fa-spin fa-3x"></i></div>
        <div *ngFor="let user of users" class="media">
            <div class="media"><a href="{{ user.html_url }}"> <img src="{{ user.avatar_url }}" class="mr-4" alt="..." width="64"
                                                                   height="64"> </a>
                <div class="media-body"><h5 class="mt-0">{{ user.login }}</h5> Score: {{ user.score }} </div>
            </div>
        </div>
    `,
    providers: [GitHubService]
})

export class AppComponent implements OnInit {
    isLoading = true;

    users = [];

    // tslint:disable-next-line:variable-name
    constructor(private _githubService: GitHubService) {
    }

    // tslint:disable-next-line:typedef
    ngOnInit() {
        this._githubService.getGitHubData('greg').subscribe(data => {
            this.isLoading = false;
            this.users = data.items;
            console.log(data.items);
        });
    }
}

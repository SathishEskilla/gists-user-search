export interface IResultComponentState {
    searchQuery?: string;
    showResultsComponent?: boolean;
    resultItemsList?: []
}

export interface ISearchResultPayLoad {
    id:string;
    files: any;
    language:string;
    forks_url:string;
    owner: {
        login: string;
        html_url: string;
        avatar_url: string;
    }
}

export interface ISearchResultGridProps {
    resultItemsList: ISearchResultPayLoad[]
}
import React, { ChangeEvent } from "react";

// import assets here
import "./App.scss";

// import custom components here
import UserCardGrid from "./components/user-card-grid/user-card-grid";

// import models/interfaces here
import { IResultComponentState } from "./models/gists-user.model";

export class App extends React.Component<any, IResultComponentState> {
  constructor(props: any) {
    super(props);
    this.state = { searchQuery: "", showResultsComponent: false };
    this.handleChange = this.handleChange.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  /**
   * @methodName handleChange
   * @description It'll update the state with input controls latest value
   * @param event<ChangeEvent>
   * @return none
   */
  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * @methodName fetchResultsFromServer
   * @description used to fetch search query results from sever
   * @param none
   * @return none
   */
  getSearchResults(): void {
    const DOMAIN = "https://api.github.com";
    const SEARCH_URL = `${DOMAIN}/users/${this.state.searchQuery}/gists`;
    fetch(SEARCH_URL)
      .then((res) => res.json())
      .then(async (result) => {
        if (result && result.length) {
          result = this.getLanguagesList(result);
        }
        await this.setState({
          showResultsComponent: true,
          resultItemsList: result,
        });
      });
  }

  /**
   * @methodName getLanguagesList
   * @description used to form the languages based on properties in files object in search result
   * @param searchResult<any[]>
   * @return <any[]>
   */
  getLanguagesList(searchResult: any[]): any[] {
    searchResult.forEach((element) => {
      element.language = element.files[Object.keys(element.files)[0]].language;
    });
    return searchResult;
  }

  render() {
    return (
      <div
        className={
          "search-component " +
          (this.state.showResultsComponent ? "show-card-grid-component" : "")
        }
      >
        <div className="search-component__title-wrapper">
          <img src={"/github.svg"} alt="git_image" />
          <div className="search-component__title-wrapper__text-wrapper">
            <h1>Search GISTS</h1>
            <span>Search public user gists below by name</span>
          </div>
        </div>

        {/* input controls code starts here */}
        <form className="search-component__input-wrapper">
          <input
            value={this.state.searchQuery}
            type="text"
            name="searchQuery"
            placeholder="Start typing to search .."
            onChange={this.handleChange}
            autoComplete="off"
          />
          <button
            onClick={this.getSearchResults}
            disabled={!this.state.searchQuery}
            type="button"
          >
            Search
          </button>
        </form>

        {/* users results grid */}
        {this.state.showResultsComponent &&
        this.state.resultItemsList?.length ? (
          <UserCardGrid resultItemsList={this.state.resultItemsList} />
        ) : (
          this.state.showResultsComponent && (
            <span>No Results found please try to edit the search text</span>
          )
        )}
      </div>
    );
  }
}

export default App;

import React from 'react';

// import assets here
import './user-card-grid.scss';

// import models/interfaces here
import { ISearchResultGridProps } from '../../models/gists-user.model';

class UserCardGrid extends React.Component<ISearchResultGridProps> {

  render() {
    return (
      <div className="user-card-grid-component">
        {this.props.resultItemsList?.map((item) =>
          <div key={item['id']} className="user-card-grid-component__wrapper">
            <div className="user-card-grid-component__wrapper__title-section">
              <div className="user-card-grid-component__wrapper__title-section__title">
                <span> User Name</span>
                <a target="_blank" href={item.owner['html_url']} rel="noopener noreferrer">
                {item.owner['login']}<span className="user-id">({item.id})</span>
                </a>
              </div>
              <div className="user-card-grid-component__wrapper__title-section__image">
                <img src={item.owner['avatar_url']} alt="profle_pic" />
              </div>
            </div>
            <div className="user-card-grid-component__wrapper__more-info">
              <div className="languages-wrapper">
                <span>Languages</span>
                <div className="tag">
                  {item.language}
                </div>
              </div>
              <div className="forks-wrapper">
                <a target="_blank" href={item['forks_url']} rel="noopener noreferrer">click here to forks list</a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserCardGrid;

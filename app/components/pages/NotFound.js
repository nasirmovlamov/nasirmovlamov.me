import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1 className="mb-4 font-weight-bold text-center">Billy proqram təminatı</h1>
        <div className="row mt-5">
          <div className="col-12">
            <div className="alert alert-danger">
              <h3>Xəta 404!</h3>
              Axtardığınız səhifə mövcud deyil. Sol menyudan səhifələrə keçid
              edərək proqram təminatını istifadə edə bilərsiz.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;

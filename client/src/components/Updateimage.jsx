import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

function Updateimage(props) {     

      // Modal close button
      const subClose = e => {
            e.preventDefault()
            props.submitImageUrl();
      }

      // Use effect to initialize modal
      useEffect(() => {
            const elems = document.querySelectorAll('.modal');
            const instances = M.Modal.init(elems);  
      }, []);

      return (
      <React.Fragment>
            <div id="modal1" class="modal" style={{ backgroundColor: "#161616" }}>
                  <div className="modal-content">
                        <form action="submit" onSubmit={subClose}>
                              <div className="row">
                                    <div class="input-field col s6">
                                          <input placeholder="https://www.some-image-url.com" id="first_name" type="text" class="validate" onChange={props.handleImageChange} required />
                                          <label for="first_name" style={{color: 'rgb(30, 136, 229)'}}>Image URL</label>
                                    </div>
                              </div>
                        </form>
                  </div>
                  <div class="modal-footer" style={{ backgroundColor: "#161616" }}>
                        <button className="btn" type="submit" onClick={subClose}>Submit</button>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat" style={{color: 'rgb(30, 136, 229)'}}>Close</a>
                  </div>
            </div>
      </React.Fragment>
      );
}

export default Updateimage;

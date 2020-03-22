import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import API from '../utils/API'

function Updateimage(props) {     
      const [modalInstance, setModalInstance] = useState(null)
      const subClose = (e) => {
            e.preventDefault()
            setModalInstance(modalInstance.modal.close)
      }
      useEffect(() => {
            const elems = document.querySelectorAll('.modal');
            const instances = M.Modal.init(elems);
            setModalInstance(instances)
            
      }, [])

      return (
            <React.Fragment>
                  <div id="modal1" class="modal" style={{ backgroundColor: "#161616" }}>
                        <div className="modal-content">
                              <form action="submit" onSubmit={subClose}>
                                    <div className="row">
                                          <div class="input-field col s6">
                                                <input placeholder="https://www.some-image-url.com" id="first_name" type="text" class="validate" onChange={props.handleImageChange} required />
                                                <label for="first_name">Image URL</label>
                                          </div>
                                    </div>
                              </form>
                        </div>
                        <div class="modal-footer" style={{ backgroundColor: "#161616" }}>
                              <button className="btn" type="submit">Submit</button>
                              <a href="#!" className="modal-close waves-effect waves-green btn-flat" style={{ color: "#66fcf1" }}>Close</a>
                        </div>
                  </div>
            </React.Fragment>
      )
}

export default Updateimage

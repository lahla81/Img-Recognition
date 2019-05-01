import React from 'react';
import './imglinkform.css';

const ImgLinkForm = ({onInputChange, onImageSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your picture, Git it a try.'}
            </p>
            <div className="pa2-l">
                <div className="form mw7 shadow-3 center pa4 br3-ns ba b--black-10">
                    <fieldset className="cf bn ma0 pa0">
                        <div className="cf shadow-2">
                            <input 
                                className="f5 input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br3-ns br--left-ns" 
                                placeholder="Photo URl" 
                                type="text" 
                                id="imgUrl"
                                onChange = {onInputChange} 
                            />
                            <input 
                                className="f5 button-reset grow fl pv3 tc dib b--black-90 bw1 bg-animate bg-black-90 hover-bg-black white pointer w-100 w-25-m w-20-l br3-ns br--right-ns" 
                                type="submit" 
                                value="Detect"
                                onClick = {onImageSubmit}
                            />
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}
export default ImgLinkForm;
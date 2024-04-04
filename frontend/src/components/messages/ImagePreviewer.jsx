import React, { useEffect } from 'react';
import ImageViewer from 'react-simple-image-viewer';
const ImagePreviewer = ({imgSrc}) => {
        useEffect(() => {
        console.log('imgSrc prop changed:', imgSrc);
        // You can perform any actions here that should occur when imgSrc prop changes
    }, [imgSrc]); // Depend on imgSrc prop
	
    
	return (
		<div>
			<input type="checkbox" id="my_modal_7" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box">
                    
                  <img   src={imgSrc} />
					<div className="modal-action">
						<label htmlFor="my_modal_7" className="btn" >
							Close!
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImagePreviewer;

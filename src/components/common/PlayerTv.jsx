import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_PATH } from '../../util/conf';

const PlayerTv = ({ count, name, id, media }) => {
    let body;
    // let iframeContent = "<video className='video-frame' ><source src='/assets/images/fake/v.mp4' /></video>"

    const iframeContent = `<div class = 'iframe-message-container' height='100' display='flex' justifyContent = 'center' alignItems = 'center'>
    <span class = 'first-span'>После сохранения вы можете увидить резултат на сервере через </span>
    <span class = 'second-span'> 30 минут </span>
    </div>`

    useLayoutEffect(() => {
        const frames = document.getElementsByTagName('iframe');
        if (frames[0] && frames[0].contentDocument.body && frames[0].contentDocument.childNodes[0]) {
            for (let i = 0; i < frames.length; i++) {
                if(!frames[i].contentDocument.childNodes[0]) {
                    window.location.reload();
                }
                frames[i].contentDocument.childNodes[0].style.height = '100%';
                frames[i].contentDocument.body.style.margin = '0';
                frames[i].contentDocument.body.style.width = '100%';
                frames[i].contentDocument.body.style.height = '100%';
                if (frames[i].contentWindow.document.getElementsByClassName('iframe-message-container')[0]) {
                    frames[i].contentWindow.document.getElementsByClassName('first-span')[0].style.textAlign = 'center';
                    frames[i].contentWindow.document.getElementsByClassName('second-span')[0].style.color = 'red';
                    frames[i].contentWindow.document.getElementsByClassName('iframe-message-container')[0].style.height = '100%';
                    frames[i].contentWindow.document.getElementsByClassName('iframe-message-container')[0].style.display = 'flex';
                    frames[i].contentWindow.document.getElementsByClassName('iframe-message-container')[0].style.justifyContent = 'center';
                    frames[i].contentWindow.document.getElementsByClassName('iframe-message-container')[0].style.alignItems = 'center';
                    frames[i].contentWindow.document.getElementsByClassName('iframe-message-container')[0].style.flexDirection = 'column';
                }
                // if(frames[i].contentWindow.document.getElementsByTagName('video')[0]) {
                //     frames[i].contentWindow.document.getElementsByTagName('video')[0].style.height = '100%';
                //     frames[i].contentWindow.document.getElementsByTagName('video')[0].style.width = '100%';
                // }
            }
        }
    })
    switch (count) {
        case 1:
            body = <div className='single-tv-player-container'>
                <div className='single-tv-player' >
                    <iframe
                        className='video-player-frame'
                        sandbox='allow-same-origin'
                        frameBorder="0"
                        id='iframe_id'
                        srcDoc={iframeContent}
                        width='100%'
                        height='100%'
                    />
                </div>
            </div>
            break;
        case 2:
            body = <div className='tv-player-container'>
                <div className='tv-player'>
                    <iframe
                        className='video-player-frame'
                        sandbox='allow-same-origin'
                        frameBorder="0"
                        id='iframe_id'
                        srcDoc={iframeContent}
                        width='100%'
                        height='100%'
                    />
                    <div className='name-container'>
                        <span>{name}</span>
                    </div>
                </div>
            </div>
            break;
        case 3:
            body = <div className={`tv-player-container small-containers container-${id}`}>
                <div className='tv-player'>
                    {media ? <img src={`${PUBLIC_PATH}/${media.image}`} className='video-frame' /> :
                        // <video className='video-frame'>
                        //     <source src='/assets/images/fake/v.mp4' />
                        // </video>
                        <iframe
                            className='video-player-frame'
                            sandbox='allow-same-origin'
                            frameBorder="0"
                            id='iframe_id'
                            srcDoc={iframeContent}

                        />
                    }
                    <div className='name-container'>
                        <span>{name}</span>
                    </div>
                </div>
            </div>
            break;
    }
    return body
};
PlayerTv.propTypes = {
    count: PropTypes.number.isRequired,
};
export default PlayerTv;

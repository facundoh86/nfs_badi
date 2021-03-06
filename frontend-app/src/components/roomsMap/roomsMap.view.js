import React,{useState} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import styles from "../roomsMap/roomsMap.module.css";
import ellipse from './assets/ellipse.png';

export const MapContainer = ({google, rooms}) => {

    const [state, setState] = useState({
        activeMarker:{},
        selectedPlace: {},
        showingInfoWindow: false,
    });

    const onClick = () => {
        console.log("click");
        if(state.showingInfoWindow){
            setState({
                activeMarker: null,
                showingInfoWindow: false,
            });
        }
    };

    const onInfoWindowClose = () => {
        console.log("click onInfoWindowClose");
    };

    const onMarkerClick = (props, marker) =>{
        console.log(props);
        console.log(marker);
        setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true,
        });
    };

    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '550px'
    }

    return (
        <>
            <Map google={google}
                 onClick={onClick}
                 containerStyle={styles.__containerStyle2}
                 zoom={12} containerStyle={containerStyle}
                 initialCenter={{lat:41.410154,lng:2.171251}}>

                {rooms && rooms.map(room => {
                        return (
                            <Marker onClick={onMarkerClick}
                                    icon={ellipse} name={room.name} id={room.id} price={room.price} position={{lat:room.latitude,lng:room.longitude}} />
                        );
                    }
                )}

                <InfoWindow marker={state.activeMarker} visible={state.showingInfoWindow} onClose={onInfoWindowClose}>
                    <div>
                        <span>{state.selectedPlace && state.selectedPlace.name}</span><br/>
                        <span>{state.selectedPlace && state.selectedPlace.price}€</span>
                    </div>
                </InfoWindow>
            </Map>
            <div />
        </>
    );
};

export default GoogleApiWrapper({
    apiKey: 'API KEY'
})(MapContainer);
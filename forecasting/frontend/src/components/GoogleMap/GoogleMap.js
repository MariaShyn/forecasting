import React  from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        styles={{ width: '500px' }}
        defaultZoom={7}
        defaultCenter={{ lat: +props.coords[0], lng: +props.coords[1] }}
    >
        {props.coords_marker.length && <Marker position={{ lat: +props.coords_marker[0], lng: +props.coords_marker[1] }} />}
    </GoogleMap>
));
export default MyMapComponent;
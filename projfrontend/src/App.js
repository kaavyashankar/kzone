import React from "react";
import $ from 'jquery';
import HttpsRedirect from 'react-https-redirect';


 
   



export default function Home() {
    return (
        <div>
            <HttpsRedirect>
            <h1>App</h1>
            </HttpsRedirect>
        </div>
    )
}


/**
 * Memorize current search so that it is always available,
 * even after changing screen
 */
var current_search = {
    search_string: ''
};


$( '#app-layout' ).on( 'click', '#search-button', function( e ) {
    e.preventDefault();
 
} );


$( '#app-layout' ).on( 'click', '#search-button', function( e ) {
    e.preventDefault();
 
    //Set search params from HTML form:
    current_search.search_string = $('#search-field').val().trim();
 
} );


$( '#app-layout' ).on( 'click', '#search-button', function( e ) {
    e.preventDefault();
 
    //Set search params from HTML form:
    current_search.search_string = $('#search-field').val().trim();
 
    //Get updated data from server for the current component:
    // eslint-disable-next-line no-undef
    App.refreshComponent({
        success: function( answer, update_results ) {
            //Server answered with a filtered list of posts. 
            //Reload current screen to see the result:
            // eslint-disable-next-line no-undef
            App.reloadCurrentScreen();
        },
        error: function( error ) {
            //Maybe do something if filtering went wrong.
            //Note that "No network" error events are triggered automatically by core
        }
    });
 
} );


/**
 * Add our search params to web services that retrieve our post list.
 * Applies to "Live Query" web service (that retrieves filtered component's post list)
 * and to "Get More Posts" web service (so that search filters apply to pagination too).
 */
// eslint-disable-next-line no-undef
App.filter( 'web-service-params', function( web_service_params ) {
 
    //If the user provided non empty search params:
    if( current_search.search_string !== '' ) {
        //Add search params to the data sent to web service:
        web_service_params.my_search_filters = current_search;
        //Those params will be retrieved with WpakWebServiceContext::getClientAppParam( 'my_search_filters' )
        //on server side.
    }
 
    return web_service_params;
} );


/**
 * Add 
 * - current search params to the archive template, so that they're available in archive.html.
 */
// eslint-disable-next-line no-undef
App.filter( 'template-args', function( template_args, view_type, view_template ) {
 
    if ( view_type === 'archive' ) {
        template_args.current_search = current_search;
    }
 
    return template_args;
} );







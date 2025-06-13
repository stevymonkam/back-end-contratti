
require.config({
    baseUrl: "../../../static/js",
    waitSeconds: 0, // Disable require.js load timeout,
	paths: {
		'jquery-ui': '../../static/app/IOG_services/javascript/lib/jquery-ui',
		'iog_lib': '../../static/app/IOG_services/javascript/iog/iog_lib',
		'iog_util': '../../static/app/IOG_services/javascript/iog/iog_util',
	}

});

//
// LIBRARY REQUIREMENTS
//
// In the require function, we include the necessary libraries and modules for
// the HTML dashboard. Then, we pass variable names for these libraries and
// modules as function parameters, in order.
// 
// When you add libraries or modules, remember to retain this mapping order
// between the library or module and its function parameter. You can do this by
// adding to the end of these lists, as shown in the commented examples below.
libs = [
    "splunkjs/mvc",
    "splunkjs/mvc/utils",
    "splunkjs/mvc/tokenutils",
    "underscore",
    "jquery",
    "splunkjs/mvc/simplexml",
    "splunkjs/mvc/headerview",
    "splunkjs/mvc/footerview",
    "splunkjs/mvc/simplexml/dashboardview",
    "splunkjs/mvc/simplexml/dashboard/panelref",
    "splunkjs/mvc/simplexml/element/chart",
    "splunkjs/mvc/simplexml/element/event",
    "splunkjs/mvc/simplexml/element/html",
    "splunkjs/mvc/simplexml/element/list",
    "splunkjs/mvc/simplexml/element/map",
    "splunkjs/mvc/simplexml/element/single",
    "splunkjs/mvc/simplexml/element/table",
    "splunkjs/mvc/simplexml/element/visualization",
    "splunkjs/mvc/simpleform/formutils",
    "splunkjs/mvc/simplexml/eventhandler",
    "splunkjs/mvc/simplexml/searcheventhandler",
    "splunkjs/mvc/simpleform/input/dropdown",
    "splunkjs/mvc/simpleform/input/radiogroup",
    "splunkjs/mvc/simpleform/input/linklist",
    "splunkjs/mvc/simpleform/input/multiselect",
    "splunkjs/mvc/simpleform/input/checkboxgroup",
    "splunkjs/mvc/simpleform/input/text",
    "splunkjs/mvc/simpleform/input/timerange",
    "splunkjs/mvc/simpleform/input/submit",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/savedsearchmanager",
    "splunkjs/mvc/postprocessmanager",
    "splunkjs/mvc/simplexml/urltokenmodel",
    "splunkjs/mvc/resultslinkview",
    "splunkjs/mvc/tableview",
    "splunkjs/mvc/textinputview",
    "splunkjs/mvc/dropdownview",
    "iog_lib",
    "iog_util",
    "splunkjs/ready!"
    ] 

require(libs, function(
		    mvc,
		    utils,
		    TokenUtils,
		    _,
		    $,
		    DashboardController,
		    HeaderView,
		    FooterView,
		    Dashboard,
		    PanelRef,
		    ChartElement,
		    EventElement,
		    HtmlElement,
		    ListElement,
		    MapElement,
		    SingleElement,
		    TableElement,
		    VisualizationElement,
		    FormUtils,
		    EventHandler,
		    SearchEventHandler,
		    DropdownInput,
		    RadioGroupInput,
		    LinkListInput,
		    MultiSelectInput,
		    CheckboxGroupInput,
		    TextInput,
		    TimeRangeInput,
		    SubmitButton,
		    SearchManager,
		    SavedSearchManager,
		    PostProcessManager,
		    UrlTokenModel,
		    ResultsLinkView,
		    TableView,
		    TextInputView,
		    DropdownView,
		    iog_lib,
		    iog_util,
    		) {

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // VARIABLES
    //

    var pageLoading = true;

	var service = mvc.createService({ owner: "nobody" });	// Create a Service instance
    
	//
    // VARIABLES
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // TOKENS
    //
    
    // Create token namespaces
    var urlTokenModel = new UrlTokenModel();
    mvc.Components.registerInstance('url', urlTokenModel);
    var defaultTokenModel = mvc.Components.getInstance('default', {create: true});
    var submittedTokenModel = mvc.Components.getInstance('submitted', {create: true});

    urlTokenModel.on('url:navigate', function() {
        defaultTokenModel.set(urlTokenModel.toJSON());
        if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
            submitTokens();
        } else {
            submittedTokenModel.clear();
        }
    });

    // Initialize tokens
    defaultTokenModel.set(urlTokenModel.toJSON());

    function submitTokens() {
        // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
        FormUtils.submitForm({ replaceState: pageLoading });
    }

    function setToken(name, value) {
        defaultTokenModel.set(name, value);
        submittedTokenModel.set(name, value);
    }

    function unsetToken(name) {
        defaultTokenModel.unset(name);
        submittedTokenModel.unset(name);
    }

    // 
    // TOKENS
    // ----------------------------------------------------------------------------------------------------------------
    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // SEARCH MANAGERS
    //

    //
    // SEARCH MANAGERS
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // SEARCH COMMANDS
    //

    //
    // SEARCH COMMANDS
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // SPLUNK HEADER AND FOOTER
    //

    new HeaderView({
        id: 'header',
        section: 'dashboards',
        el: $('.header'),
        acceleratedAppNav: true,
        useSessionStorageCache: true,
        splunkbar: true,
        appbar: true,
        litebar: false,
    }, {tokens: true}).render();

    new FooterView({
        id: 'footer',
        el: $('.footer')
    }, {tokens: true}).render();

    //
    // SPLUNK HEADER AND FOOTER
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // DASHBOARD EDITOR
    //

    new Dashboard({
        id: 'dashboard',
        el: $('.dashboard-body'),
        showTitle: true,
        editable: false
    }, {tokens: true}).render();

    //
    // DASHBOARD EDITOR
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // PAGE FORMATTER
    //

    iog_lib.row_append(".dashboard-body", "row-image");
    iog_lib.cell_append("#row-image", "cell-image");
    iog_lib.panel_append("#cell-image", "panel-image");
    iog_lib.html_append('#panel-image', '<p align="center"><img src="../../static/app/IOG_healthy_questionary/images/not_configured.png" alt="Not Configured"></p>');
    
    //
    // PAGE FORMATTER
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // VIEWS: VISUALIZATION ELEMENTS
    //

    //
    // VIEWS: VISUALIZATION ELEMENTS
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // EVENTS
    //

    //
    // EVENTS
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // TOKENS
    //

    // Initialize time tokens to default
    if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
        defaultTokenModel.set({ earliest: '0', latest: '' });
    }

    submitTokens();

	// Se sono in editor leggo i parametri dell'oggetto
	if (defaultTokenModel.get('action') == 'edit') {
		setFilterToken();
	}

    // 
    // TOKENS
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // DASHBOARD READY
    //

    DashboardController.ready();
    pageLoading = false;

    //
    // DASHBOARD READY
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // CUSTOM FUNCTIONS
    //

    //
    // CUSTOM FUNCTIONS
    // ----------------------------------------------------------------------------------------------------------------

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // WRITE SCRIPT LOADED
    //

	var err = (new Error).stack.split("\n");
    var file = err[0];
    if (file == 'Error') {
    	file = err[1].substring(7);
    }
    console.log(new Date().toString(), "File " + file + " loaded!")

    //
    // WRITE SCRIPT LOADED
    // ----------------------------------------------------------------------------------------------------------------
});

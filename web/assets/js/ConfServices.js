(() => {
    'use stricts';

    function login($http, $interval) {

        const api = 'v1/login';
        let token = null;
        let company = null;
        let loginPath = null;

        this.on = user => {
            const basicToken = btoa(`${user.email}:${user.passwd}`);
            console.log(basicToken);
            console.log(user.email);
            console.log(user.passwd);
            $http({ 
                method: 'GET',
                url: api,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${basicToken}`,
                    'company': user.company
                }
            })
                .then(r => (r.status === 200) ? r.data : null)
                .then(d => {
                    company = user.company;

                    loginPath = (company) ? `#!.?${company}` : '#!.';

                    const sd = new Date();
                    const ed = new Date(d.expiresIn);

                    $interval(() => {
                        window.location.href = loginPath;
                    }, (ed.getTime() - sd.getTime()));

                    token = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${d.token}`,
                        'company': user.company
                    };
                    // console.log($http.defaults.headers.common);
                    window.location.href = '#!'
                });
        };

        this.check = () => (token) ? token : null;
        this.redirect = () => window.location.href = (loginPath) ? loginPath : '#!_';
        this.headers = this.check;
    };

    function save_entry($http, $interval) {

        const api = 'v1/company/entry/';

        this.on = new_entry => {
            $http({
                method: 'POST',
                url: api + new_entry.company._id,
                headers: new_entry.token,
                data: {
                    year: new_entry.entry_date.getFullYear(),
                    addition: new_entry.addition,
                    withdraw: new_entry.withdraw
                }
            })
            .then(() => {
                window.location.href = '#!'
            });
        };

    };

    function get_company($http, $interval) {

        const api = 'v1/company';
        

        this.on = headers => {

            return $http({
                method: 'GET',
                url: api,
                headers: headers
            })
            .then(r => (r.status === 200) ? r.data : null)
            .then(d => {
                return d[0];
            });
        };

        
    };

    angular
        .module('application')
        .service('$login', login)
        .service('$save_entry', save_entry)
        .service('$get_company', get_company);
        // .service('$register_company', register_company);

})();
class AppResponse {
    private readonly data;
    private readonly errors;
    private readonly message: string;

    /** 
     * @params {Object} data
     * @params {Object} errors
     * @params {Object} message
     
     */

    constructor({data, errors = {}, message = ""}) {
        this.data = data;
        this.errors = errors;
        this.message = message
    }
}

export default AppResponse
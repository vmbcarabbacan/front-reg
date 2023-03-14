import { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";

class ApiService {
    
    public static vueInstance: App;

    /**
     * 
     * @param app 
     * 
     * @description initialize vue axios
     */
    public static init(app: App<Element>) {
        ApiService.vueInstance = app;
        ApiService.vueInstance.use(VueAxios, axios);
        ApiService.vueInstance.axios.defaults.baseURL = process.env.VUE_APP_API_URL
    }
    
    /**
     * 
     *  @description set header
     */
    public static setHeader(): void {
        ApiService.vueInstance.axios.defaults.headers.common['Content-Type'] = `application/json`
    }

    // /**
    //  * 
    //  */
    //  public static setFileHeader(): void {
    //     ApiService.vueInstance.axios.defaults.headers["Content-Type"] = `multipart/form-data`;
    //   }

    /**
     * 
     * @param resource 
     * @param params 
     * @returns Promise<AxiosResponse>
     */
    public static query(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.get(resource, params)
        .catch((err) => {
            throw new Error(`ApiService: ${err}`);
        });
    }

    /**
     * 
     * @param resource 
     * @param slug 
     * @returns Promise<AxiosResponse>
     */
    public static get(resource: string, slug = "" as string): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.get(`${resource}/${slug}`)
        .catch((err) => {
            throw new Error(`ApiService ${err}`);
        })
    }

    /**
     * 
     * @param resource 
     * @param params 
     * @returns Promise<AxiosResponse>
     */
    public static post(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.post(`${resource}`, params);
    }

    /**
     * 
     * @param resource 
     * @param slug 
     * @param params 
     * @returns 
     */
    public static update(resource: string, slug: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
    }

    /**
     * 
     * @param resource 
     * @param params 
     * @returns 
     */
    public static put(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.vueInstance.axios.put(`${resource}`, params);
    }

    /**
     * 
     * @param resource 
     * @returns 
     */
    public static delete(resource: string): Promise<AxiosResponse>{
        return ApiService.vueInstance.axios.delete(resource)
        .catch((err) => {
            throw new Error(`ApiService: ${err}`)
        })
    }
 
}


export default ApiService;
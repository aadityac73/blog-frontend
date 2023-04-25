import axios from "axios";
import { BASEURL } from "../constants/constants";
import Result from "../core/Result";
import { includeAuthTokenInRequest } from "./shared";

class ApiService {
  httpClient;
  httpClientWithAuth;

  constructor() {
    this.httpClient = axios.create({
      baseURL: BASEURL,
      headers: { Accept: "application/json" },
    });

    this.httpClientWithAuth = axios.create({
      baseURL: BASEURL,
      headers: { Accept: "application/json" },
    });

    this.httpClientWithAuth.interceptors.request.use(
      includeAuthTokenInRequest,
      (error) => {
        return Promise.reject(error.message);
      }
    );
  }

  async getAllBlogs() {
    try {
      const {data} = await this.httpClient.get('blog');
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async createBlog(props) {
    try {
      const {data} = await this.httpClientWithAuth.post('blog', props.body);
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async getUserBlogs() {
    try {
      const {data} = await this.httpClientWithAuth.get('blog/user');
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async getBlogById(props) {
    try {
      const {data} = await this.httpClient.get(`blog/${props.id}`);
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async updateBlog(props) {
    try {
      const {data} = await this.httpClientWithAuth.put(`blog/${props.id}`, props.body);
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async deleteBlog(props) {
    try {
      const {data} = await this.httpClientWithAuth.delete(`blog/${props.id}`);
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async login(props) {
    try {
      const {data} = await this.httpClient.post('auth/login', props.body);
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async register(props) {
    try {
      const {data} = await this.httpClient.post('auth/register', props.body);
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }

  async logout() {
    try {
      const {data} = await this.httpClientWithAuth.post('auth/logout');
      return Result.success(data)
    } catch (error) {
      return Result.failed(error)
    }
  }
}

export default new ApiService()

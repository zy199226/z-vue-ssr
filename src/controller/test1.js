import axios from '../options/axiosCore';
import { TEST1 } from '../options/api';

/**
 * 测试1
 */
export const test1 = params => axios({
    method: 'get',
    url: TEST1.CONTENT,
    params
}).then(res => res.data);

/**
 * 测试2
 */
export const test2 = params => axios({
    method: 'get',
    url: TEST1.CONTENT,
    params
}).then(res => res.data);

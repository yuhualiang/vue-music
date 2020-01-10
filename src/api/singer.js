// import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {
  commonParams
} from './config'

export function getSingerList() {
  const url = '/api/getSingerList'
  const data = Object.assign({}, commonParams, {
    '-': 'getUCGI3576305317716697',
    g_tk: 5381,
    loginUin: 1547719290,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      'comm': {
        'ct': 24,
        'cv': 0
      },
      'singerList': {
        'module': 'Music.SingerListServer',
        'method': 'get_singer_list',
        'param': {
          'area': -100,
          'sex': -100,
          'genre': -100,
          'index': -100,
          'sin': 0,
          'cur_page': 1
        }
      }
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

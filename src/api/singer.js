import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {
  commonParams, options
} from './config'

export function getSingerList() {
  const url = '/api/getSingerList'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    g_tk: 5381,
    format: 'json',
    inCharset: 'utf8',
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
    },
    loginUin: 1547719290,
    '-': 'getUCGI9956005171968898'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singerId
  })

  return jsonp(url, data, options)
}
// export function getSingerDetail(singerId) {
//   const url = '/api/getSingerDetailList'

//   const data = Object.assign({}, commonParams, {
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq.json',
//     g_tk: 5381,
//     format: 'json',
//     inCharset: 'utf8',
//     loginUin: 0,
//     data: {
//       'comm': {
//         'ct': 24,
//         'cv': 0
//       },
//       'singer': {
//         'method': 'get_singer_detail_info',
//         'param': {
//           'sort': 5,
//           'singermid': singerId,
//           'sin': 0,
//           'num': 100
//         },
//         'module': 'music.web_singer_info_svr'
//       }
//     },
//     '-': 'getUCGI0966630712027079'
//   })

//   // return jsonp(url, data, options)
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

import { imageClassify } from 'baidu-aip-sdk';
import fs from 'fs';

// 设置APPID/AK/SK
const APP_ID = '57836271';
const API_KEY = 'ytqn1ql8pnhsns0AZkhsXgup';
const SECRET_KEY = 'WylX4aNqVEqkgqS4hxbwY22RcB8BrHGw';

// 创建一个客户端
const client = new imageClassify(APP_ID, API_KEY, SECRET_KEY);

export async function POST(req) {

    console.log('req', req.body)
    if (req.method === 'POST') {
        try {
            const res = await req.json()
            const image = res.image;
            // const result = await plantDetect(image);
            // console.log('res', JSON.stringify(result))
            // return Response.json(result);
            return Response.json({
                "result": [
                    {
                        "score": 0.702003,
                        "name": "花烛",
                        "baike_info": {
                            "baike_url": "http://baike.baidu.com/item/%E8%8A%B1%E7%83%9B/15417121",
                            "image_url": "https://bkimg.cdn.bcebos.com/pic/2f738bd4b31c8701ed2f38452f7f9e2f0608fffc",
                            "description": "花烛(Anthurium andraeanum Linden)是天南星科花烛属多年生常绿草本植物。茎节短；叶自基部生出，绿色，革质，全缘，长圆状心形或卵心形。叶柄细长，佛焰苞平出，革质并有蜡质光泽，橙红色或猩红色；肉穗花序黄色，可常年开花不断。花烛原产于哥斯达黎加、哥伦比亚等热带雨林区。常附生在树上，有时附生在岩石上或直接生长在地上，性喜温暖、潮湿、半阴的环境，忌阳光直射。花烛花姿奇特美妍。花期持久，适合盆栽、切花或庭园荫蔽处丛植美化。(概述图片来源：)"
                        }
                    },
                    {
                        "score": 0.023697697,
                        "name": "火鹤花",
                        "baike_info": {
                            "baike_url": "https://baike.baidu.com/item/%E7%81%AB%E9%B9%A4%E8%8A%B1/1790177",
                            "image_url": "https://bkimg.cdn.bcebos.com/pic/a6efce1b9d16fdfaaf51c1dbf0d89b5494eef01fcdf5?x-bce-process=image/resize,m_lfit,w_536,limit_1/quality,Q_70",
                            "description": "火鹤花（Anthurium scherzerianum）是天南星科花烛属植物，为多年生常绿草本，茎矮短，叶丛生，长椭圆形，先端尖，全缘，浓绿色，革质平滑，长约20厘米，宽约5厘米，株高约30厘米。花梗细长，佛焰苞红色，阔卵形，先端急尖，长约15厘米，宽约10厘米。肉穗花序螺旋状扭曲橙红色。原产于南美洲哥斯达黎加和危地马拉的热带雨林。火鹤花性喜好温暖、半阴的环境，怕强光畏寒冷，生长适温20-30℃。越冬时最低温度要保持在16℃。火鹤花花形奇特，水养持久，主要用于切花，颇具热带情调，在多种花卉制品中广泛使用。（概述图参考来源：）"
                        }
                    },
                    {
                        "score": 0.021659555,
                        "name": "马蹄莲",
                        "baike_info": {
                            "baike_url": "http://baike.baidu.com/item/%E9%A9%AC%E8%B9%84%E8%8E%B2/201250",
                            "image_url": "https://bkimg.cdn.bcebos.com/pic/f703738da9773912b90f44adf2198618377ae2d5",
                            "description": "马蹄莲，(学名：Zantedeschia aethiopica (L.) Spreng.)，是单子叶植物纲、天南星科、马蹄莲属多年生粗壮草本。具块茎，并容易分蘖形成丛生植物。叶基生，叶下部具鞘；叶片较厚，绿色，心状箭形或箭形，先端锐尖、渐尖或具尾状尖头，基部心形或戟形。喜疏松肥沃、腐殖质丰富的粘壤土。马蹄莲花有毒，内含大量草本钙结晶和生物碱，误食会引起昏眠等中毒症状。该物种为中国植物图谱数据库收录的无毒植物，其毒性为块茎、佛焰苞,肉穗花序有毒。咀嚼一小块块茎可引起舌喉肿痛。马蹄莲可药用，具有清热解毒的功效。治烫伤，鲜马蹄莲块茎适量，捣烂外敷。预防破伤风，在创伤处，用马蹄莲块茎捣烂外敷。马蹄莲有毒， 禁忌内服。马蹄莲在欧美国家是新娘捧花的常用花。也是埃塞俄比亚的国花。"
                        }
                    }
                ],
                "log_id": 1771753330169460700
            });
        } catch (error) {
            console.error(error);
            return Response.json({ error: 'Internal Server Error' });
        }
    } else {
        return Response.json({ error: 'Method Not Allowed' });
    }
}

// 封装植物识别方法
function plantDetect(image) {
    return new Promise((resolve, reject) => {
        client.plantDetect(image, { baike_num: 4 }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });
}
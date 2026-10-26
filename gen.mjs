// bkkhairrangking.com 静的サイト生成（Wix から移行・2026-10-27）
// 使い方: node gen.mjs → dist/ に全ページを書き出す
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://www.bkkhairrangking.com';
const OUT = 'docs';
const CIEL_BOOK = 'https://ciel-hair-studio.web.app/booking/?utm_source=bkkhairranking';
const CIEL_SITE = 'https://www.ciel-japanesehairstudio-bkk.com/';
const CONTACT_MAIL = 'aki@ciel-japanesehairstudio-bkk.com';
const TODAY = '2026-10-27';

const L = {
  ja: { code:'ja', html:'ja', hreflang:'ja-jp', path:'/', name:'日本語',
    title:'【2026年最新版】バンコク注目日系ヘアサロンTOP3|Best Japanese Hair Salon in Bangkok 2026 | Bangkok Japanese Hair Salon',
    desc:'「バンコク日系ヘアサロン特集 2026」は、バンコクで注目を集める日系美容室・ヘアサロンを紹介するウェブメディアです。日本人スタイリストによる丁寧な技術と上質なデザインを大切にし、カット・カラー・トリートメントなど最新トレンドを発信。バンコクで信頼できる日系サロンを探している方に向けて、口コミ・人気ランキング・おすすめ情報を分かりやすくまとめています。',
    top1:'【2026年最新版】', top2:'Best Japanese Hair Salon in Bangkok 2026',
    h1:['2026年、','注目のヘアサロン','in バンコク'],
    lead:['【２０２６年最新版】バンコク注目の日系ヘアサロン Ciel Japanese Hair Studio by Aki をはじめ、Best Japanese Hair Salon in Bangkok 2026 を徹底調査。','バンコクには数多くのヘアサロンがありますが、日本の美容師による丁寧な技術と細やかな接客を体験できるお店はごくわずか。','本ページでは、各店の公開情報・料金・立地をもとに編集部が比較・整理し、２０２６年に注目すべき日系サロンを厳選してご紹介します。'],
    whyH:'日系サロンがこんなに!?',
    why:['バンコクでは、日系ヘアサロンの人気が年々高まっています。','カットの繊細さ、色味の美しさ、そしておもてなしの丁寧さ、、、','そのどれもが「日本人のスタイリストだからこそ」と感じさせる仕上がり。','ここでは実際来店したお客様の声や現地で評価をもとに、２０２６年に注目を集める日系ヘアサロンをピックアップしました。','技術・空間・雰囲気、そのすべてにこだわりが光るお店ばかりです。','「失敗したくない」「信頼できる美容師に任せたい」','そんな方にこそ知ってほしい、リアルな人気サロンをご紹介します。'],
    bandA:'バンコク', bandB:'注目サロン', bandC:'Top 3',
    ciel:{ name:'Ciel Japanese Hair Studio by Aki', tag:['世界で磨かれた感性と日本の繊細さが融合する、','モダンヘアサロン'],
      body:['２０２５年１０月にニューオープン。','グレーを基調とした静かな空間で、上質な時間を過ごせる日系サロン。','プロンポン駅徒歩３分という好立地。','日本とタイのハーフオーナー兼美容師 Aki は、日本、オーストラリア、ドバイで経験を積み、世界基準のデザインと日本独自の精密な技術を融合。','特にハイトーンカラーでは、ダメージを最小限に抑えたブリーチワークと、色落ちまで考えたカラーデザインで支持を集めている。','オープンからわずかでGoogleレビュー5.0を維持。','2026年最も注目される日系サロンとして話題を集めている。'],
      fb:'Ciel.Japanese.Hair.Salon', open:'Open 10:00-19:00', close:'Close 水曜日、第１、第３火曜日', book:'ご予約' },
    zan:{ name:'hairCRAFTZAN', tag:['日本クオリティーの技術で、','自然体の美しさを引き出すサロン'],
      body:['スクンビット・ソイ３９に位置する日系ヘアサロン。','日本らしい丁寧な技術とナチュラルなデザインで、ローカルからも信頼を集めている。','バンコクでは数少ないJHCA（日本ヘアカラー協会）加盟店として、豊富なカラーメニューを展開。','髪質に合わせた明るめトーンの提案や、メンズカットの仕上がりにも定評がある。','ハイライトやバレイヤージュも得意とする。','日本人をはじめ、タイ人インフルエンサーにも支持されている。'],
      open:'Open 9:00-18:00', close:'Close 水曜日', book:'ご予約' },
    contactH:'お問い合わせ', contactP:'フォームからご連絡ください。できるだけ早くお返事します。', fn:'お名前', ln:'姓', email:'メールアドレス', msg:'メッセージ', send:'送信',
    blogH:'ブログ', blogAll:'すべての記事', readMin:'読了時間', min:'分', latest:'最新記事', back:'ブログ一覧へ', home:'トップへ',
    footer:'© 2026 Bangkok Japanese Hair Salon Guide' },
  en: { code:'en', html:'en', hreflang:'en-us', path:'/en/', name:'English',
    title:'Best Japanese Hair Salon in Bangkok 2026 | Top 3 Japanese Hair Salons in Bangkok [2026 Latest Edition]',
    desc:'"Bangkok Japanese Hair Salon Guide 2026" introduces the Japanese hair salons attracting attention in Bangkok. Careful techniques by Japanese stylists, quality design, and the latest trends in cuts, colour and treatments. Reviews, rankings and recommendations for anyone looking for a trustworthy Japanese salon in Bangkok.',
    top1:'[2026 Latest Edition]', top2:'Best Japanese Hair Salon in Bangkok 2026',
    h1:['2026,','Featured Hair Salons','in Bangkok'],
    lead:['[2026 Latest Edition] A thorough investigation of the Best Japanese Hair Salons in Bangkok 2026, including Bangkok\'s notable Japanese hair salon, Ciel Japanese Hair Studio by Aki.','There are many hair salons in Bangkok, but there are very few where you can experience the careful techniques and attentive customer service of a Japanese hairdresser.','On this page, our editorial team compares and organizes each salon based on public information, prices and location, and introduces a carefully selected list of Japanese salons worth paying attention to in 2026.'],
    whyH:'Japanese Salons Have Come This Far!',
    why:['Japanese hair salons are becoming more and more popular in Bangkok every year.','The delicacy of the cut, the beauty of the color, and the attentive hospitality...','Each and every one of them has a finish that makes you feel like it could only be done by a Japanese stylist.','Here, based on the feedback from customers who have actually visited and local evaluations, we have picked out Japanese hair salons that will be attracting attention in 2026.','These shops are all renowned for their attention to detail in terms of technique, space, and atmosphere.','"I don\'t want to make a mistake" "I want to leave it to a trustworthy hairdresser"','We would like to introduce some real popular salons that people like you should know about.'],
    bandA:'Bangkok', bandB:'Featured Salon', bandC:'Top 3',
    ciel:{ name:'Ciel Japanese Hair Studio by Aki', tag:['A combination of globally refined sensibilities and Japanese delicacy.','Modern Hair Salon'],
      body:['New opening in October 2025.','Ciel is a quiet, grey-toned Japanese salon where you can spend quality time.','Conveniently located just a 3-minute walk from Phrom Phong Station.','Aki, the half-Japanese, half-Thai owner and hairdresser, has gained experience in Japan, Australia and Dubai, and combines world-class design with precise Japanese techniques.','Especially for high-tone colors, the salon has gained popularity for its bleaching work that minimizes damage and color designs that take color fading into consideration.','Shortly after opening, the salon has maintained a 5.0 rating on Google reviews.','It is attracting attention as the most anticipated Japanese salon of 2026.'],
      fb:'Ciel.Japanese.Hair.Salon', open:'Open 10:00-19:00', close:'Closed Wednesdays, and the first and third Tuesdays', book:'Reservation' },
    zan:{ name:'hairCRAFTZAN', tag:['With Japanese quality technique,','A salon that brings out your natural beauty'],
      body:['This Japanese hair salon is located on Sukhumvit Soi 39.','With careful Japanese techniques and natural designs, the salon has gained the trust of locals.','As one of the few JHCA (Japan Hair Color Association) member stores in Bangkok, it offers a wide range of color options.','The salon is also well-known for suggesting lighter tones to suit different hair types, and for its excellent men\'s cuts.','It also specializes in highlights and balayage.','It is popular among Japanese people as well as Thai influencers.'],
      open:'Open 9:00-18:00', close:'Closed Wednesday', book:'Reservation' },
    contactH:'Inquiry', contactP:'Get in touch by filling out the form. We\'ll respond as soon as we can.', fn:'First Name', ln:'Last Name', email:'Email', msg:'Message', send:'Submit',
    blogH:'Blog', blogAll:'All Posts', readMin:'Reading time', min:'min', latest:'Latest posts', back:'Back to blog', home:'Home',
    footer:'© 2026 Bangkok Japanese Hair Salon Guide' },
  th: { code:'th', html:'th', hreflang:'th-th', path:'/th/', name:'ไทย',
    title:'ร้านทำผมญี่ปุ่นที่ดีที่สุดในกรุงเทพฯ 2026 | 3 อันดับร้านทำผมญี่ปุ่นแนะนำในกรุงเทพฯ [เวอร์ชั่นล่าสุด]',
    desc:'"คู่มือร้านทำผมญี่ปุ่นในกรุงเทพฯ 2026" แนะนำร้านทำผมสไตล์ญี่ปุ่นที่น่าจับตามองในกรุงเทพฯ เทคนิคที่พิถีพิถันโดยสไตลิสต์ชาวญี่ปุ่น ดีไซน์คุณภาพ และเทรนด์ล่าสุดของการตัด ทำสี และทรีตเมนต์ รีวิว อันดับ และคำแนะนำสำหรับผู้ที่กำลังมองหาร้านทำผมญี่ปุ่นที่ไว้ใจได้ในกรุงเทพฯ',
    top1:'[เวอร์ชั่นล่าสุด ปี 2026]', top2:'ร้านทำผมญี่ปุ่นที่ดีที่สุดในกรุงเทพฯ ปี 2026',
    h1:['2026,','ร้านทำผมแนะนำ','ในกรุงเทพฯ'],
    lead:['[ฉบับล่าสุดปี 2026] การสำรวจอย่างละเอียดเกี่ยวกับร้านทำผมญี่ปุ่นที่ดีที่สุดในกรุงเทพฯ ปี 2026 รวมถึงร้านทำผมญี่ปุ่นที่โดดเด่นอย่าง Ciel Japanese Hair Studio by Aki','กรุงเทพฯ มีร้านทำผมมากมาย แต่มีเพียงไม่กี่แห่งเท่านั้นที่มอบประสบการณ์การจัดแต่งทรงผมโดยช่างทำผมชาวญี่ปุ่นที่มีเทคนิคพิถีพิถันและการบริการลูกค้าที่เอาใจใส่','ในหน้านี้ ทีมบรรณาธิการของเราเปรียบเทียบและเรียบเรียงจากข้อมูลสาธารณะ ราคา และทำเลของแต่ละร้าน เพื่อคัดสรรร้านทำผมญี่ปุ่นที่ควรค่าแก่การจับตามองในปี 2026'],
    whyH:'ร้านทำผมญี่ปุ่น มาไกลถึงขนาดนี้แล้ว!',
    why:['ในกรุงเทพฯ ความนิยมของร้านทำผมสไตล์ญี่ปุ่นเพิ่มขึ้นทุกปี','การตัดผมที่ประณีต สีสันสวยงาม และการบริการที่เอาใจใส่...','แต่ละทรงมีรายละเอียดที่ทำให้คุณคิดว่า "นี่ต้องเป็นฝีมือของสไตลิสต์ชาวญี่ปุ่นเท่านั้นแน่"','ในที่นี้ เราใช้เสียงจริงจากลูกค้าที่เคยใช้บริการจริง และการประเมินจากคนในพื้นที่ คัดเลือกร้านทำผมสไตล์ญี่ปุ่นที่น่าจับตามองที่สุดสำหรับปี 2026 มาให้แล้ว','ร้านเหล่านี้ล้วนโดดเด่นด้วยความใส่ใจในรายละเอียด ทั้งเทคนิค พื้นที่ และบรรยากาศ','"ไม่อยากพลาด" "อยากฝากผมไว้กับช่างที่ไว้ใจได้"','สำหรับคุณที่กำลังมองหาแบบนั้น เราขอแนะนำร้านทำผมยอดนิยมตัวจริงเหล่านี้ค่ะ'],
    bandA:'กรุงเทพฯ', bandB:'ร้านเสริมสวยแนะนำ', bandC:'Top 3',
    ciel:{ name:'Ciel Japanese Hair Studio โดย Aki', tag:['เซนส์ที่ขัดเกลาจากประสบการณ์ระดับโลก ผสานกับความละเอียดอ่อนแบบญี่ปุ่น','โมเดิร์นแฮร์ซาลอน'],
      body:['เปิดใหม่เดือนตุลาคม 2025','Ciel คือร้านทำผมญี่ปุ่นโทนสีเทาที่เงียบสงบ ให้คุณใช้เวลาได้อย่างมีคุณภาพ','ทำเลดีเยี่ยม เดินเพียง 3 นาทีจากสถานีพร้อมพงษ์','อากิ เจ้าของร้านและช่างทำผมลูกครึ่งญี่ปุ่น-ไทย สั่งสมประสบการณ์จากญี่ปุ่น ออสเตรเลีย และดูไบ ผสมผสานดีไซน์ระดับโลกเข้ากับเทคนิคญี่ปุ่นที่แม่นยำ','โดยเฉพาะสีโทนสว่าง ทางร้านโด่งดังเรื่องการฟอกที่ลดความเสียหาย และการออกแบบสีที่คำนึงถึงตอนสีจางลง','หลังเปิดร้านได้ไม่นาน ร้านยังคงคะแนนรีวิว Google ที่ 5.0 มาตลอด','จึงถูกจับตามองในฐานะร้านทำผมญี่ปุ่นที่น่าจับตามองที่สุดของปี 2026'],
      fb:'ร้านทำผมญี่ปุ่น Ciel', open:'เปิดเวลา 10:00-19:00 น.', close:'หยุดทุกวันพุธ และวันอังคารที่ 1 และ 3 ของเดือน', book:'การจอง' },
    zan:{ name:'แฮร์คราฟต์ซาน', tag:['ด้วยเทคนิคคุณภาพจากญี่ปุ่น','ร้านเสริมสวยที่จะดึงความงามตามธรรมชาติของคุณออกมา'],
      body:['ร้านทำผมญี่ปุ่น ตั้งอยู่ที่ซอยสุขุมวิท 39','ด้วยฝีมือการตัดแต่งทรงผมที่ประณีตและดีไซน์ที่เป็นธรรมชาติ ซึ่งเป็นเอกลักษณ์ของญี่ปุ่น ทำให้ได้รับความไว้วางใจจากคนท้องถิ่น','ในฐานะที่เป็นหนึ่งในร้านทำผมไม่กี่แห่งในกรุงเทพฯ ที่เป็นสมาชิกของ JHCA (สมาคมทำสีผมแห่งประเทศญี่ปุ่น) ทางร้านจึงมีบริการทำสีผมที่หลากหลายให้เลือก','ทางร้านเป็นที่รู้จักในเรื่องการแนะนำโทนสีอ่อนที่เหมาะกับสภาพเส้นผมต่างๆ และการตัดผมชายที่ยอดเยี่ยม','นอกจากนี้ยังชำนาญด้านไฮไลท์และบาลายาจอีกด้วย','ได้รับความนิยมทั้งจากชาวญี่ปุ่นและอินฟลูเอนเซอร์ชาวไทย'],
      open:'เปิดทำการเวลา 9:00-18:00 น.', close:'ปิดทำการวันพุธ', book:'การจอง' },
    contactH:'สอบถาม', contactP:'ติดต่อเราได้โดยกรอกแบบฟอร์ม เราจะติดต่อกลับโดยเร็วที่สุด', fn:'ชื่อ', ln:'นามสกุล', email:'อีเมล', msg:'ข้อความ', send:'ส่ง',
    blogH:'บล็อก', blogAll:'บทความทั้งหมด', readMin:'เวลาอ่าน', min:'นาที', latest:'บทความล่าสุด', back:'กลับไปที่บล็อก', home:'หน้าแรก',
    footer:'© 2026 Bangkok Japanese Hair Salon Guide' },
  'zh-hk': { code:'zh-hk', html:'zh-Hant-HK', hreflang:'zh-hk', path:'/zh-hk/', name:'中文（香港）',
    title:'曼谷最佳日式美髮沙龍 2026 | 曼谷日系美髮沙龍 TOP3【2026 最新版】',
    desc:'「曼谷日系美髮沙龍特集 2026」介紹曼谷備受矚目的日系美髮沙龍。日本設計師的細緻技術與優質設計，以及剪髮、染髮、護髮的最新趨勢。為正在曼谷尋找值得信賴的日系沙龍的您，整理口碑、排名與推薦資訊。',
    top1:'[2026 最新版本]', top2:'曼谷最佳日式美髮沙龍（2026）',
    h1:['2026年','曼谷特色','美髮沙龍'],
    lead:['【2026 最新版】對 2026 年曼谷最佳日式美髮沙龍進行了全面調查，其中包括備受推崇的日系美髮沙龍 Ciel Japanese Hair Studio by Aki。','曼谷有許多美髮沙龍，但只有少數幾家能提供由技藝精湛、服務周到的日本美髮師為您打造髮型的體驗。','在本頁中，編輯團隊根據各店的公開資訊、價格與地點進行比較整理，為您精選 2026 年最值得關注的日系沙龍。'],
    whyH:'日系沙龍，已經進化到這種程度！',
    why:['在曼谷，日系美髮沙龍的人氣逐年上升。','精緻的剪裁、美麗的色彩和周到的服務…','它們每一件作品的最終效果都讓人不禁感嘆：「這只能出自日本設計師之手。」','在這裡，我們根據實際到店顧客的回饋和現場評價，挑選了 2026 年最值得關注的日系美髮沙龍。','這些店鋪在各方面都非常注重細節，從技術和空間到氛圍都無可挑剔。','「我不想犯錯」「我想把頭髮交給一位值得信賴的理髮師」','如果您正在尋找這樣的地方，我們想向您介紹一些真正受歡迎的美髮沙龍。'],
    bandA:'曼谷', bandB:'特色沙龍', bandC:'前三名',
    ciel:{ name:'Ciel Japanese Hair Studio by Aki', tag:['融合了世界各地美感和日本細膩手法，','現代美髮沙龍'],
      body:['2025年10月新開幕。','Ciel 是一家以灰色為主調的寧靜日系沙龍，讓您度過優質的時光。','地理位置優越，距離 BTS 澎蓬站（Phrom Phong）僅需步行 3 分鐘。','店主兼髮型師 Aki 擁有日本和泰國雙重血統，曾在日本、澳洲和杜拜累積豐富經驗，將世界級的設計與日本精湛的技藝融為一體。','尤其擅長高明度髮色，以減少損傷的漂髮技術，以及考慮到褪色後也好看的調色設計而備受好評。','開幕不久，Google 評分一直保持在 5.0。','被譽為 2026 年最受矚目的日系沙龍。'],
      fb:'Ciel日式美髮沙龍', open:'營業時間：10:00-19:00', close:'每週三及每月第一、第三個週二休息', book:'預訂' },
    zan:{ name:'hairCRAFTZAN', tag:['採用日本優質技術，','一家能展現您自然之美的沙龍'],
      body:['這家日系美髮沙龍位於素坤逸路 39 巷。','憑藉日本特有的精湛剪裁與自然設計，贏得了當地人的信任。','作為曼谷為數不多的日本染髮協會 (JHCA) 會員沙龍之一，店內提供多種染髮服務。','沙龍以推薦適合不同髮質的淺色調著稱，男士剪髮技術也廣受好評。','此外也擅長挑染與漸層染髮。','深受日本人與泰國網紅的喜愛。'],
      open:'營業時間：9:00-18:00', close:'週三休息', book:'預訂' },
    contactH:'詢問', contactP:'請填寫表格與我們聯絡。我們會盡快回覆。', fn:'名', ln:'姓', email:'電郵', msg:'訊息', send:'送出',
    blogH:'部落格', blogAll:'所有文章', readMin:'閱讀時間', min:'分鐘', latest:'最新文章', back:'返回部落格', home:'首頁',
    footer:'© 2026 Bangkok Japanese Hair Salon Guide' },
};

const POSTS = [
  { id:'post3', slug:'バンコクのベストサロンレビュー', min:5 },
  { id:'post1', slug:'人気のヘアサロン-バンコクでの体験', min:5 },
  { id:'post2', slug:'バンコクのトレンド-最新サロン情報', min:4 },
].map(p => { const j = JSON.parse(fs.readFileSync(`src/${p.id}.body.json`, 'utf8'));
  const parts = j.parts.filter(x => !(x.t && /image-prompt|^akihaircut$|^読了時間|^20\d\d年\d+月\d+日$/.test(x.t)));
  const title = parts.find(x => x.tag === 'h1')?.t || p.slug;
  const body = parts.filter(x => x.tag !== 'h1');
  const excerpt = body.find(x => x.tag === 'p')?.t || '';
  return { ...p, title, body, excerpt, date: '2025-10-29', dateJa: j.date || '2025年10月29日' }; });

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const postUrl = p => `/post/${encodeURIComponent(p.slug)}/`;

const CSS = `
:root{--bg:#f7f3ec;--paper:#fffdf9;--ink:#1f1f1d;--mute:#6b6963;--line:#e2ddd2;--band:#eef3c2;--green:#8bc53f;--blue:#1d6fd6}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"Noto Serif JP","Noto Serif Thai","Noto Serif TC",Georgia,serif;line-height:1.9;font-size:16px;-webkit-font-smoothing:antialiased}
a{color:inherit}img{max-width:100%;height:auto;display:block}
.wrap{max-width:1040px;margin:0 auto;padding:0 20px}
header.site{padding:14px 0 10px;text-align:center;position:relative}
header.site .lang{position:absolute;left:20px;top:16px;font-size:13px}
header.site .lang select{font:inherit;font-size:13px;padding:4px 8px;border:1px solid var(--line);background:#fff;border-radius:4px}
header.site .kicker{font-weight:700;font-size:15px;margin:0}
header.site .kicker a{text-decoration:none}
header.site .sub{font-size:14px;margin:0;color:var(--mute)}
header.site nav{font-size:13px;margin-top:6px}header.site nav a{margin:0 8px;color:var(--mute)}
.hero{display:grid;grid-template-columns:1.05fr 1fr;align-items:stretch;margin:14px 0 40px}
.hero img{width:100%;height:100%;object-fit:cover;min-height:360px}
.hero .txt{background:var(--paper);padding:48px 40px}
.hero h1{font-weight:500;font-size:38px;line-height:1.35;margin:0 0 28px;letter-spacing:.02em}
.hero h1 span{display:block}.hero h1 span:nth-child(2){padding-left:1.2em}.hero h1 span:nth-child(3){padding-left:3em}
.hero p{font-size:13.5px;margin:0 0 8px;color:#333}
section.why{text-align:center;padding:36px 0 50px}
section.why h2{font-size:36px;font-weight:500;letter-spacing:.05em;margin:0 0 28px}
section.why p{margin:0 0 6px;font-size:15.5px}
.band{background:var(--band);padding:48px 0;margin:10px 0 0}
.band .wrap{display:flex;align-items:center;justify-content:space-between;gap:30px}
.band .l{font-size:34px;line-height:1.3;color:#9ec44f;letter-spacing:.08em}.band .l span{display:block}.band .l span+span{padding-left:1.5em}
.band .r{font-size:96px;font-weight:700;color:var(--green);font-family:"Noto Sans JP",Helvetica,Arial,sans-serif;line-height:1}
article.salon{background:var(--paper);padding:48px 40px 40px;margin:0 0 2px}
article.salon h2{font-size:30px;font-weight:600;margin:0 0 8px;letter-spacing:.02em}
article.salon .tag{margin:0 0 26px;padding-left:1.5em;font-size:15.5px}
article.salon .tag span{display:block}
article.salon img.photo{width:100%;max-width:720px;margin:0 auto 34px}
article.salon .body p{margin:0 0 4px}article.salon .body p.gap{margin-top:22px}
.links{list-style:none;padding:0;margin:30px 0 14px;font-size:15px}
.links li{display:flex;align-items:center;gap:12px;margin:0 0 6px}
.links svg{width:18px;height:18px;flex:none;fill:#444}
.hours{margin:10px 0 18px;padding-left:30px;font-size:15px}
.btn{display:inline-block;background:var(--blue);color:#fff;text-decoration:none;font-size:13px;padding:10px 32px;border-radius:3px;margin-left:30px;font-family:"Noto Sans JP",Helvetica,Arial,sans-serif}
.btn:hover{opacity:.9}
.zan h2{font-family:"Noto Sans JP",Helvetica,Arial,sans-serif;font-weight:800}
section.contact{display:grid;grid-template-columns:1fr 1fr;margin:40px 0 0;background:#fff}
section.contact .form{padding:50px 48px;font-family:"Noto Sans JP",Helvetica,Arial,sans-serif}
section.contact h2{font-size:26px;font-weight:500;margin:0 0 10px}
section.contact p{font-size:13px;color:#444;margin:0 0 20px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
label{display:block;font-size:11px;color:#444;margin:10px 0 4px}
input,textarea{width:100%;font:inherit;font-size:14px;padding:8px 10px;border:1px solid #bbb;border-radius:2px;background:#fff}
textarea{min-height:90px;resize:vertical}
button.send{margin-top:18px;width:100%;background:var(--blue);color:#fff;border:0;font:inherit;font-size:14px;padding:10px;border-radius:2px;cursor:pointer}
section.contact img{width:100%;height:100%;object-fit:cover;min-height:380px}
footer.site{text-align:center;font-size:12.5px;color:var(--mute);padding:36px 0 44px}
footer.site a{color:var(--mute);margin:0 6px}
/* blog */
.blog h1{font-size:28px;font-weight:500;margin:20px 0 20px}
.post-list{display:grid;gap:22px;margin:0 0 40px}
.card{display:grid;grid-template-columns:300px 1fr;background:#fff;border:1px solid var(--line)}
.card img{width:100%;height:100%;object-fit:cover;min-height:220px}
.card .c{padding:22px 26px}
.card h2{font-size:20px;font-weight:600;margin:0 0 8px}.card h2 a{text-decoration:none}
.card .meta{font-size:12px;color:var(--mute);margin:0 0 10px}
.card p{font-size:14px;margin:0;color:#333;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
article.post{background:#fff;border:1px solid var(--line);padding:40px 48px;margin:20px 0 30px;max-width:860px;margin-left:auto;margin-right:auto}
article.post h1{font-size:30px;font-weight:600;margin:0 0 6px;line-height:1.4}
article.post .meta{font-size:12.5px;color:var(--mute);margin:0 0 24px}
article.post img.cover{margin:0 0 30px;max-height:420px;object-fit:cover;width:100%}
article.post h2{font-size:22px;font-weight:600;margin:34px 0 10px}
article.post h3{font-size:18px;font-weight:600;margin:24px 0 6px}
article.post p{margin:0 0 14px;font-size:15.5px}
article.post ul,article.post ol{margin:0 0 14px;padding-left:1.4em}article.post li{margin:0 0 4px;font-size:15.5px}
.latest h2{font-size:18px;font-weight:600;margin:0 0 12px}
.latest ul{list-style:none;padding:0;margin:0 0 30px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.latest li{background:#fff;border:1px solid var(--line);padding:14px 16px;font-size:14px}
.latest li a{text-decoration:none}.latest li small{display:block;color:var(--mute);font-size:12px;margin-top:4px}
@media (max-width:820px){
 header.site .lang{position:static;margin-bottom:8px}
 .hero{grid-template-columns:1fr}.hero img{min-height:240px}.hero .txt{padding:32px 22px}.hero h1{font-size:28px}
 section.why h2{font-size:26px}.band .wrap{flex-direction:column;align-items:flex-start}.band .l{font-size:26px}.band .r{font-size:72px}
 article.salon{padding:32px 20px}article.salon h2{font-size:24px}.btn{margin-left:0}
 section.contact{grid-template-columns:1fr}section.contact .form{padding:32px 22px}section.contact img{min-height:220px}
 .card{grid-template-columns:1fr}article.post{padding:26px 20px}.latest ul{grid-template-columns:1fr}
}`;

const ICON = {
  ig:'<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21 7.6c0-1.6-.4-3-1.5-4.1S17 2 15.4 2H8.6C7 2 5.6 2.4 4.5 3.5S3 6 3 7.6v8.8c0 1.6.4 3 1.5 4.1S7 22 8.6 22h6.8c1.6 0 3-.4 4.1-1.5S21 18 21 16.4zm-1.8 8.8c0 1.2-.3 2.1-.9 2.7s-1.5.9-2.7.9H8.4c-1.2 0-2.1-.3-2.7-.9s-.9-1.5-.9-2.7V7.6c0-1.2.3-2.1.9-2.7s1.5-.9 2.7-.9h7.2c1.2 0 2.1.3 2.7.9s.9 1.5.9 2.7z"/></svg>',
  line:'<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 5.6 2 10.1c0 4 3.6 7.4 8.4 8 .3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6s5.9-3.5 8-6c1.5-1.6 2-3.3 2-5C22 5.6 17.5 2 12 2zM8.4 12.9H6.3c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5v3.4h1.6c.3 0 .5.2.5.5s-.2.5-.5.5zm1.9-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5s.5.2.5.5zm4.7 0c0 .2-.1.4-.3.5h-.2c-.2 0-.3-.1-.4-.2l-2-2.7v2.4c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.5c0-.2.1-.4.3-.5h.2c.2 0 .3.1.4.2l2 2.7V8.5c0-.3.2-.5.5-.5s.5.2.5.5zm3.3-2.4c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1z"/></svg>',
  wa:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2l-.5-.3z"/></svg>',
  fb:'<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
  web:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 9h-3a15.7 15.7 0 0 0-1.4-6A8 8 0 0 1 18.9 11zM12 4c.9 1.2 2 3.6 2.4 7H9.6C10 7.6 11.1 5.2 12 4zM5.1 11a8 8 0 0 1 4.4-6 15.7 15.7 0 0 0-1.4 6zm0 2h3a15.7 15.7 0 0 0 1.4 6A8 8 0 0 1 5.1 13zM12 20c-.9-1.2-2-3.6-2.4-7h4.8c-.4 3.4-1.5 5.8-2.4 7zm2.5-1a15.7 15.7 0 0 0 1.4-6h3a8 8 0 0 1-4.4 6z"/></svg>',
  tt:'<svg viewBox="0 0 24 24"><path d="M16.5 3c.3 2.2 1.7 3.7 3.9 3.9v3.2c-1.4 0-2.7-.4-3.9-1.2v6.5A5.9 5.9 0 1 1 10.6 9.5c.3 0 .6 0 .9.1v3.3a2.7 2.7 0 1 0 1.9 2.6V3z"/></svg>',
  tel:'<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.2 1z"/></svg>',
};

const langSwitch = (l, pathFor) => `<div class="lang"><label><select onchange="location.href=this.value" aria-label="Language">${Object.values(L).map(x=>`<option value="${pathFor(x)}"${x.code===l.code?' selected':''}>${x.name}</option>`).join('')}</select></label></div>`;

const head = (l, {title, desc, url, alt, og, type='website', extra=''}) => `<!DOCTYPE html>
<html lang="${l.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url}">
${alt ? alt.map(a=>`<link rel="alternate" hreflang="${a.hreflang}" href="${SITE}${a.path}">`).join('\n') : ''}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:type" content="${type}">
<meta property="og:image" content="${SITE}${og||'/img/og.jpg'}">
<meta property="og:site_name" content="Bangkok Japanese Hair Salon Guide 2026">
<meta name="twitter:card" content="summary_large_image">
<link rel="alternate" type="application/rss+xml" title="【2026年最新版】バンコク注目ヘアサロン - RSS" href="${SITE}/blog-feed.xml">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600&family=Noto+Serif+Thai:wght@400;500;600&family=Noto+Serif+TC:wght@400;500;600&family=Noto+Sans+JP:wght@400;700;800&display=swap" rel="stylesheet">
<style>${CSS}</style>
${extra}
</head>
<body>`;

const siteHeader = (l, pathFor) => `<header class="site"><div class="wrap">
${langSwitch(l, pathFor)}
<p class="kicker"><a href="${l.path}">${esc(l.top1)}</a></p>
<p class="sub">${esc(l.top2)}</p>
<nav><a href="${l.path}">${esc(l.home)}</a>·<a href="/blog/">${esc(l.blogH)}</a>·<a href="${l.path}#contact">${esc(l.contactH)}</a></nav>
</div></header>`;

const siteFooter = l => `<footer class="site"><div class="wrap">
<div>${Object.values(L).map(x=>`<a href="${x.path}" hreflang="${x.hreflang}">${x.name}</a>`).join(' ')} · <a href="/blog/">${esc(l.blogH)}</a></div>
<div style="margin-top:8px">${esc(l.footer)}</div>
</div></footer></body></html>`;

const contactForm = l => `<section class="contact" id="contact">
<div class="form"><h2>${esc(l.contactH)}</h2><p>${esc(l.contactP)}</p>
<form onsubmit="event.preventDefault();var f=this;location.href='mailto:${CONTACT_MAIL}?subject='+encodeURIComponent('[bkkhairrangking] '+f.fn.value+' '+f.ln.value)+'&body='+encodeURIComponent(f.msg.value+'\\n\\n'+f.fn.value+' '+f.ln.value+'\\n'+f.email.value)">
<div class="row"><div><label>${esc(l.fn)}</label><input name="fn" required></div><div><label>${esc(l.ln)}</label><input name="ln"></div></div>
<label>${esc(l.email)} *</label><input name="email" type="email" required>
<label>${esc(l.msg)}</label><textarea name="msg"></textarea>
<button class="send" type="submit">${esc(l.send)}</button>
</form></div>
<img src="/img/contact.jpg" alt="" loading="lazy" width="1400" height="925">
</section>`;

const homePage = l => {
  const alt = [{hreflang:'x-default',path:'/'}, ...Object.values(L).map(x=>({hreflang:x.hreflang,path:x.path}))];
  const ld = {"@context":"https://schema.org","@type":"ItemList","name":l.top2,"url":SITE+l.path,"itemListElement":[
    {"@type":"ListItem","position":1,"item":{"@type":"HairSalon","name":"Ciel Japanese Hair Studio by Aki","url":CIEL_SITE,"telephone":"+66926923578","address":{"@type":"PostalAddress","addressLocality":"Bangkok","addressCountry":"TH","streetAddress":"Ariston Hotel 2F, 19 Soi Sukhumvit 24, Khlong Tan"},"openingHours":"Mo,Tu,Th,Fr,Sa,Su 10:00-19:00"}},
    {"@type":"ListItem","position":2,"item":{"@type":"HairSalon","name":"hairCRAFTZAN","url":"https://haircraftzan.shopinfo.jp/","telephone":"+66847578622","address":{"@type":"PostalAddress","addressLocality":"Bangkok","addressCountry":"TH","streetAddress":"Sukhumvit Soi 39"},"openingHours":"Mo,Tu,Th,Fr,Sa,Su 09:00-18:00"}}]};
  const c = l.ciel, z = l.zan;
  const gap = (arr, idx) => arr.map((p,i)=>`<p${idx.includes(i)?' class="gap"':''}>${esc(p)}</p>`).join('');
  return head(l,{title:l.title,desc:l.desc,url:l.path,alt,extra:`<script type="application/ld+json">${JSON.stringify(ld)}</script>`}) +
  siteHeader(l, x=>x.path) + `<main class="wrap">
<section class="hero"><img src="/img/hero.jpg" alt="${esc(l.top2)}" width="1600" height="1068" fetchpriority="high">
<div class="txt"><h1>${l.h1.map(s=>`<span>${esc(s)}</span>`).join('')}</h1>${l.lead.map(p=>`<p>${esc(p)}</p>`).join('')}</div></section>
<section class="why"><h2>${esc(l.whyH)}</h2>${l.why.map((p,i)=>`<p${i===3||i===5?' style="margin-top:22px"':''}>${esc(p)}</p>`).join('')}</section>
</main>
<div class="band"><div class="wrap"><div class="l"><span>${esc(l.bandA)}</span><span>${esc(l.bandB)}</span></div><div class="r">${esc(l.bandC)}</div></div></div>
<main class="wrap">
<article class="salon ciel" id="ciel"><h2>${esc(c.name)}</h2><p class="tag">${c.tag.map(s=>`<span>${esc(s)}</span>`).join('')}</p>
<img class="photo" src="/img/ciel.jpg" alt="${esc(c.name)}" width="1600" height="897" loading="lazy">
<div class="body">${gap(c.body,[3,5])}</div>
<ul class="links">
<li>${ICON.ig}<a href="https://www.instagram.com/ciel_japanese_hair_bangkok/" target="_blank" rel="noopener">ciel_japanese_hair_bangkok</a></li>
<li>${ICON.line}<a href="https://line.me/R/ti/p/@ciel.hair" target="_blank" rel="noopener">@ciel.hair</a></li>
<li>${ICON.wa}<a href="https://wa.me/66926923578" target="_blank" rel="noopener">+66-92-692-3578</a></li>
<li>${ICON.fb}<a href="https://www.facebook.com/Ciel.Japanese.Hair.Salon" target="_blank" rel="noopener">${esc(c.fb)}</a></li>
<li>${ICON.web}<a href="${CIEL_SITE}" target="_blank" rel="noopener">${CIEL_SITE}</a></li>
</ul>
<div class="hours">${esc(c.open)}<br>${esc(c.close)}</div>
<a class="btn" href="${CIEL_BOOK}" target="_blank" rel="noopener">${esc(c.book)}</a>
</article>
<article class="salon zan" id="zan"><h2>${esc(z.name)}</h2><p class="tag">${z.tag.map(s=>`<span>${esc(s)}</span>`).join('')}</p>
<img class="photo" src="/img/zan.jpg" alt="${esc(z.name)}" width="1098" height="809" loading="lazy">
<div class="body">${gap(z.body,[2,5])}</div>
<ul class="links">
<li>${ICON.ig}<a href="https://www.instagram.com/haircrafzan/" target="_blank" rel="noopener">haircrafzan</a></li>
<li>${ICON.fb}<a href="https://www.facebook.com/Hair.Craf.Zan" target="_blank" rel="noopener">Hair.Craf.Zan</a></li>
<li>${ICON.tt}<a href="https://www.tiktok.com/@haircraftzan" target="_blank" rel="noopener">@haircraftzan</a></li>
<li>${ICON.line}<span>@Zan</span></li>
<li>${ICON.web}<a href="https://haircraftzan.shopinfo.jp/" target="_blank" rel="noopener">https://www.haircraftzan.shopinfo.jp</a></li>
</ul>
<div class="hours">${esc(z.open)}<br>${esc(z.close)}</div>
<a class="btn" href="tel:+66847578622">${esc(z.book)}</a>
</article>
${contactForm(l)}
</main>` + siteFooter(l);
};

const blogIndex = () => { const l = L.ja;
  return head(l,{title:'ブログ | 【2026年最新版】バンコク注目ヘアサロン',desc:'バンコクのヘアサロンに関する記事一覧。',url:'/blog/',og:'/img/blog.jpg'}) +
  siteHeader(l, x=>x.path) + `<main class="wrap blog"><h1>${esc(l.blogAll)}</h1><div class="post-list">` +
  POSTS.map(p=>`<div class="card"><a href="${postUrl(p)}"><img src="/img/blog.jpg" alt="" loading="lazy" width="1200" height="1200"></a><div class="c"><h2><a href="${postUrl(p)}">${esc(p.title)}</a></h2><p class="meta">akihaircut · ${p.dateJa} · ${l.readMin}: ${p.min}${l.min}</p><p>${esc(p.excerpt)}</p></div></div>`).join('') +
  `</div></main>` + siteFooter(l); };

const postPage = p => { const l = L.ja;
  const body = p.body.map(x => x.tag==='p' ? `<p>${esc(x.t)}</p>` : /^h/.test(x.tag) ? `<${x.tag}>${esc(x.t)}</${x.tag}>` : `<${x.tag}>${x.items.map(i=>`<li>${esc(i)}</li>`).join('')}</${x.tag}>`).join('\n');
  const ld = {"@context":"https://schema.org","@type":"BlogPosting","headline":p.title,"datePublished":p.date,"dateModified":p.date,"author":{"@type":"Person","name":"akihaircut"},"image":SITE+'/img/blog.jpg',"mainEntityOfPage":SITE+postUrl(p),"description":p.excerpt.slice(0,160)};
  const others = POSTS.filter(o=>o!==p);
  return head(l,{title:`${p.title} | 【2026年最新版】バンコク注目ヘアサロン`,desc:p.excerpt.slice(0,155),url:postUrl(p),og:'/img/blog.jpg',type:'article',extra:`<script type="application/ld+json">${JSON.stringify(ld)}</script>`}) +
  siteHeader(l, x=>x.path) + `<main class="wrap"><article class="post"><h1>${esc(p.title)}</h1><p class="meta">akihaircut · ${p.dateJa} · ${l.readMin}: ${p.min}${l.min}</p><img class="cover" src="/img/blog.jpg" alt="" width="1200" height="1200">${body}</article>
<section class="latest"><h2>${esc(l.latest)}</h2><ul>${others.map(o=>`<li><a href="${postUrl(o)}">${esc(o.title)}</a><small>${o.dateJa}</small></li>`).join('')}</ul><p><a href="/blog/">← ${esc(l.back)}</a></p></section></main>` + siteFooter(l); };

// ---- 書き出し
fs.rmSync(OUT, {recursive:true, force:true}); fs.mkdirSync(OUT, {recursive:true});
const w = (rel, s) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), {recursive:true}); fs.writeFileSync(f, s); };
fs.cpSync('src/img', path.join(OUT,'img'), {recursive:true});
for (const l of Object.values(L)) w(l.code==='ja' ? 'index.html' : `${l.code}/index.html`, homePage(l));
w('blog/index.html', blogIndex());
for (const p of POSTS) w(`post/${p.slug}/index.html`, postPage(p));
w('CNAME', 'www.bkkhairrangking.com\n');
w('.nojekyll', '');
w('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
w('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#8bc53f"/><text x="32" y="43" font-size="34" font-family="Helvetica,Arial" font-weight="700" text-anchor="middle" fill="#fff">3</text></svg>`);
const urls = [...Object.values(L).map(l=>({u:l.path,m:TODAY,alt:true})), {u:'/blog/',m:TODAY}, ...POSTS.map(p=>({u:postUrl(p),m:p.date}))];
w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  urls.map(x=>`<url><loc>${SITE}${x.u}</loc><lastmod>${x.m}</lastmod>${x.alt?Object.values(L).map(l=>`<xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE}${l.path}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`:''}</url>`).join('\n') + `\n</urlset>\n`);
w('blog-feed.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>【2026年最新版】バンコク注目ヘアサロン</title><link>${SITE}/blog/</link><description>バンコクのヘアサロン情報</description><language>ja</language>\n` +
  POSTS.map(p=>`<item><title>${esc(p.title)}</title><link>${SITE}${postUrl(p)}</link><guid>${SITE}${postUrl(p)}</guid><pubDate>${new Date(p.date+'T09:00:00+07:00').toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`).join('\n') + `\n</channel></rss>\n`);
// 旧 Wix の URL（/en /th /zh-hk をスラッシュ無しで）→ GitHub Pages はフォルダで解決するので別途不要。404 ページ
w('404.html', head(L.ja,{title:'ページが見つかりません | バンコク注目ヘアサロン',desc:'',url:'/404.html'}) + siteHeader(L.ja,x=>x.path) + `<main class="wrap" style="text-align:center;padding:60px 0"><h1 style="font-weight:500">404</h1><p>ページが見つかりません。<a href="/">トップへ</a></p></main>` + siteFooter(L.ja));
console.log('wrote', fs.readdirSync(OUT).length, 'entries →', OUT);

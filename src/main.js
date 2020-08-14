const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'https://www.baidu.com/favicon.ico', url: 'https://www.baidu.com'},
    {logo: 'https://www.bilibili.com/favicon.ico', url: 'https://www.bilibili.com'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">
                    <img width="80%" height="80%" src="${node.logo}">
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>           
           </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    });
}
render()

$(".addButton").on('click', () => {
    let url = window.prompt('请输入你要添加网页的网址')
    let imgUrl;
    if (url.indexOf('https') !== 0) {
        url = 'https://www.' + url
        imgUrl = url + '/favicon.ico'
    }

    hashMap.push({
        logo: imgUrl,
        url: url
    });
    render()
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

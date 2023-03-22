// ==UserScript==
// @name            Google: Highlight File Types
// @icon           https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png
// @namespace       https://greasyfork.org/users/783910
// @version         0.3.1
// @description     Highlight file type labels in Google search results
// @author          ysnr777
// @match           https://www.google.com/search?*
// @grant           none
// @license         MIT
// ==/UserScript==

const fileSettings = {
  PDF: {
    title: 'Adobe Portable Document Format (.pdf)',
    background: '#FDE3E4',
    color: '#EC1C24',
    iconSlug: 'adobeacrobatreader',
  },
  XLS: {
    title: 'Microsoft Excel (.xls, .xlsx)',
    background: '#E9F9F0',
    color: '#217346',
    iconSlug: 'microsoftexcel',
  },
  DOC: {
    title: 'Microsoft Word (.doc, .docx)',
    background: '#E1EAF7',
    color: '#2B579A',
    iconSlug: 'microsoftword',
  },
  PPT: {
    title: 'Microsoft PowerPoint (.ppt, .pptx)',
    background: '#F9EAE7',
    color: '#B7472A',
    iconSlug: 'microsoftpowerpoint',
  },
  KML: {
    title: 'Google Earth (.kml, .kmz)',
    background: '#E9F1FE',
    color: '#4285F4',
    iconSlug: 'googleearth',
  },
  default: {
    background: '#FFFF99',
    color: '#4D5156',
  },
};

(function () {
  'use strict'
  for (const el of document.querySelectorAll('span.ZGwO7.C0kchf.NaCKVc.VDgVie')) {
    const setting = fileSettings[el.textContent in fileSettings ? el.textContent : 'default']

    // style
    el.style.fontWeight = 'bold'
    el.style.backgroundColor = setting.background
    el.style.borderColor = setting.color
    el.style.color = setting.color

    // title
    if ('title' in setting) {
      el.title = setting.title
    }

    // icon
    if ('iconSlug' in setting) {
      // CDNからSVGを文字列で取得
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/${setting.iconSlug}.svg`, true)
      xhr.onload = function () {
        // 取得したSVG文字列を要素に変換して追加
        const span = document.createElement('span')
        const svg = span.appendChild(xhr.responseXML.querySelector('svg'))

        // 不要なtitle要素を削除
        svg.querySelector('title').remove()

        // style
        span.style.marginRight = '0.5em'
        svg.style.height = '1em'
        svg.style.fill = setting.color

        el.prepend(span)
      }
      xhr.send()
    }
  }
})()

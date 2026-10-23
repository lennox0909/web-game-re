const fs = require('fs');
const filePath = 'src/project.js'; // 確認檔案路徑

let code = fs.readFileSync(filePath, 'utf8');
// 抓出所有 \uXXXX 格式並轉換為實際字元
let decodedCode = code.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 16));
});

fs.writeFileSync(filePath, decodedCode, 'utf8');
console.log('解碼完成！');
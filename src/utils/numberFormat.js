import numeral from "numeral";
// Format number to currency. (Làm tròn chỉ lấy 2 chữ số thập phân)
export function fCurrency(number){
    return numeral(number).format(Number.isInteger(number)? "$0,0":"$0,0.00")
}
// format number to percent. (Làm tròn lấy 1 chữ số thập phân)
export function fPercent(number){
    return numeral(number/100).format("0.0%")
}
// format number to Number (chỉ lấy Số Nguyên)
export function fNumber(number){
    return numeral(number).format()
}
// format number to shorttennumber ( làm tròn chỉ lấy 2 số thập phân)
export function fShortenNumber(number){
    return numeral(number).format("0.00a").replace(".00","")
}
// format number 
export function fData(number){
    return numeral(number).format("0.0 b")
}
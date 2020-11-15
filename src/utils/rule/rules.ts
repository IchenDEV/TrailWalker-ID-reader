class Rx {

    public static idCard(val: string): boolean {
        /** 检查二代身份证是否合法 */
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static hangkong(val: string): boolean {
        const reg2 = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;

        if (!reg2.test(val)) {
            return false;
        }
        return true;
    }

    public static taiwan(val: string): boolean {
        const reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;

        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static passport(val: string): boolean {
        const reg = / ^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g|E|e]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/;

        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static height(val: string): boolean {
        const reg = /^[1-9][0-9]{2,3}$/;
        // tslint:disable-next-line:radix
        if (!reg.test(val) || parseInt(val) > 250 || parseInt(val) < 50) {
            return false;
        }
        return true;
    }

    public static mobilePhone(val: string): boolean {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static qq(val: string): boolean {
        const reg = /^[1-9][0-9]{4,14}$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static sid(val: string): boolean {
        const reg = /^[0-9a-zA-Z_]{1,}$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }

    public static mail(val: string): boolean {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(val)) {
            return false;
        }
        return true;
    }
}

const nameRules = [
    (v: string) => !!v || "需要名称",
    (v: string) => (v && v.length <= 8) || "名称必须小于8个字符",
];
const sloganRules = [
    (v: string) => !!v || "需要口号",
    (v: string) => (v && v.length <= 15) || "口号必须小于15个字符"
];
const idCardRules = [
    (v: string) => !!v || "需要身份证号",
    (v: string) => (v && Rx.idCard(v)) || "身份证号格式不正确"
];
const hangkongRules = [
    (v: string) => (v && Rx.hangkong(v)) || "请输入正确的港澳身份证"
];
const taiwanRules = [
    (v: string) => (v && Rx.hangkong(v)) || "请输入正确的台湾身份证"
];
const passportRules = [
    (v: string) => (v && Rx.passport(v)) || "请输入正确的护照"
];
const heightRules = [
    (v: string) => (v && Rx.height(v)) || "请输入正确的身高"
];
const sidRules = [
    (v: string) => !!v || "需要学号",
    (v: string) => (v && Rx.sid(v)) || "错误的学号"
];
const phoneRules = [
    (v: string) => !!v || "需要手机号",
    (v: string) => (v && Rx.mobilePhone(v)) || "手机号格式不正确"
];
const emailRules = [
    (v: string) => !!v || "需要邮箱",
    (v: string) => (v && Rx.mail(v)) || "邮箱格式不正确"
];
const qqRules = [
    (v: string) => (v && Rx.qq(v)) || "QQ不正确"
];

export {
    nameRules,
    idCardRules,
    passportRules,
    taiwanRules,
    hangkongRules,
    phoneRules,
    sloganRules,
    sidRules,
    emailRules,
    qqRules,
    heightRules
};

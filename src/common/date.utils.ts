import moment from "moment";

export default abstract class DateUtils {
  public static formatDateFieldValue(value?: string, showUndefined = true): string {
    if (value == undefined) {
      return showUndefined ? '-' : '';
    }
    return moment(value).format('DD/MM/YYYY');
  }

  public static formatDatetimeFieldValue(value?: string, showUndefined = true): string {
    if (value == undefined) {
      return showUndefined ? '-' : '';
    }
    return moment(value).format('DD/MM/YYYY HH:mm:ss');
  }

  public static parseDateToISODatetimeString(date: string) {
    if (!date) return null;
    return moment(date).toISOString();
  }

  public static formatToISODateString(date: string) {
    if (!date) return null;
    return moment(date).format('YYYY-MM-DD');
  }
}

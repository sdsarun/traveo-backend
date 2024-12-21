import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc"
import * as timezone from "dayjs/plugin/timezone"
import * as buddhistEra from "dayjs/plugin/buddhistEra"
import * as isBetween from "dayjs/plugin/isBetween"

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
dayjs.extend(isBetween);

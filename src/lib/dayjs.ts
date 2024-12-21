import * as dayjsDefault from "dayjs";
import * as utc from "dayjs/plugin/utc"
import * as timezone from "dayjs/plugin/timezone"
import * as buddhistEra from "dayjs/plugin/buddhistEra"
import * as isBetween from "dayjs/plugin/isBetween"

dayjsDefault.extend(utc);
dayjsDefault.extend(timezone);
dayjsDefault.extend(buddhistEra);
dayjsDefault.extend(isBetween);

const dayjs = dayjsDefault;
export default dayjs;
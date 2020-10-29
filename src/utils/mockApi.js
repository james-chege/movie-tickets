import nock from "nock";
import { API_URL } from "./constants";

export default (method, uri, body, responseCode) =>
    nock(API_URL)
        .defaultReplyHeaders({
            "access-control-allow-origin": "*",
            "access-control-allow-credentials": "true",
        })[method](uri)
        .reply(responseCode, body);

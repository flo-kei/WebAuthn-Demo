/*
 * @license
 * Copyright 2021 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

/*
 * Modification notice
 * Base64 to arraybuffer encoding and decoding was changed
 * Instead of herrjemand/Base64URL-ArrayBuffer library shown in comment line 25
 * the npmjs package base64-arraybuffer is used now (https://www.npmjs.com/package/base64-arraybuffer)
 */

import { decode, encode } from "base64-arraybuffer";
//import "https://cdn.jsdelivr.net/gh/herrjemand/Base64URL-ArrayBuffer@latest/lib/base64url-arraybuffer.js?module";

function encodeCredential(credential) {
  const encodedCredential = {};
  encodedCredential.id = credential.id;
  encodedCredential.rawId = encode(credential.rawId);
  encodedCredential.type = credential.type;
  if (credential.response) {
    [
      "clientDataJSON",
      "authenticatorData",
      "signature",
      "userHandle",
      "attestationObject",
    ].forEach(property => {
      if (property) {
        const encodedProperty = encode(credential.response[property]);
        encodedCredential.response = {
          ...encodedCredential.response,
          [property]: encodedProperty
        };
      }
    });
  }
  return encodedCredential;
}

function decodeServerOptions(encodedOptions) {
  const decodedOptions = {
    ...encodedOptions
  };
  if (decodedOptions.user) {
    decodedOptions.user.id = decode(encodedOptions.user.id);
  }
  if (decodedOptions.challenge) {
    decodedOptions.challenge = decode(encodedOptions.challenge);
  }
  if (decodedOptions.excludeCredentials) {
    for (let cred of encodedOptions.excludeCredentials) {
      cred.id = decode(cred.id);
    }
  }
  if (decodedOptions.allowCredentials) {
    for (let cred of encodedOptions.allowCredentials) {
      cred.id = decode(cred.id);
    }
  }
  return decodedOptions;
}

export { encodeCredential, decodeServerOptions };

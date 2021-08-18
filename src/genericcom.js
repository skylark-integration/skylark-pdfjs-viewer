define([
  "./pdfjs_dev",
  "./app",
  "./preferences",
  "./download_manager",
  "./genericl10n",
  "./generic_scripting"
],function(
  PDFJSDev,
  app,
  preferences,
  download_manager,
  genericl10n,
  generic_scripting
){
  /* Copyright 2017 Mozilla Foundation
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  const { DefaultExternalServices, PDFViewerApplication } = app;
  const { BasePreferences } = preferences;
  const { DownloadManager } = download_manager;
  const { GenericL10n } = genericl10n;
  const { GenericScripting } = generic_scripting;

  if (typeof PDFJSDev !== "undefined" && !PDFJSDev.test("GENERIC")) {
    throw new Error(
      'Module "pdfjs-web/genericcom" shall not be used outside ' +
        "GENERIC build."
    );
  }

  const GenericCom = {};

  class GenericPreferences extends BasePreferences {
    async _writeToStorage(prefObj) {
      localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));
    }

    async _readFromStorage(prefObj) {
      return JSON.parse(localStorage.getItem("pdfjs.preferences"));
    }
  }

  class GenericExternalServices extends DefaultExternalServices {
    static createDownloadManager(options) {
      return new DownloadManager();
    }

    static createPreferences() {
      return new GenericPreferences();
    }

    static createL10n({ locale = "en-US" }) {
      return new GenericL10n(locale);
    }

    static createScripting({ sandboxBundleSrc }) {
      return new GenericScripting(sandboxBundleSrc);
    }
  }
  PDFViewerApplication.externalServices = GenericExternalServices;

  return { GenericCom };
});
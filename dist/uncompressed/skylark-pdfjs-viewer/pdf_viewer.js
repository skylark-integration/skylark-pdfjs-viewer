define([
  "skylark-pdfjs-display",
  "./ui_utils",
  "./base_viewer"
],function(pdfjsLib,ui_utils,base_viewer){
  /* Copyright 2014 Mozilla Foundation
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

  const { ScrollMode, SpreadMode } = ui_utils;
  const { BaseViewer } = base_viewer;
  const { shadow } = pdfjsLib;

  class PDFViewer extends BaseViewer {
    get _viewerElement() {
      return shadow(this, "_viewerElement", this.viewer);
    }

    _scrollIntoView({ pageDiv, pageSpot = null, pageNumber = null }) {
      if (!pageSpot && !this.isInPresentationMode) {
        const left = pageDiv.offsetLeft + pageDiv.clientLeft;
        const right = left + pageDiv.clientWidth;
        const { scrollLeft, clientWidth } = this.container;
        if (
          this._isScrollModeHorizontal ||
          left < scrollLeft ||
          right > scrollLeft + clientWidth
        ) {
          pageSpot = { left: 0, top: 0 };
        }
      }
      super._scrollIntoView({ pageDiv, pageSpot, pageNumber });
    }

    _getVisiblePages() {
      if (this.isInPresentationMode) {
        // The algorithm in `getVisibleElements` doesn't work in all browsers and
        // configurations (e.g. Chrome) when Presentation Mode is active.
        return this._getCurrentVisiblePage();
      }
      return super._getVisiblePages();
    }

    _updateHelper(visiblePages) {
      if (this.isInPresentationMode) {
        return;
      }
      let currentId = this._currentPageNumber;
      let stillFullyVisible = false;

      for (const page of visiblePages) {
        if (page.percent < 100) {
          break;
        }
        if (
          page.id === currentId &&
          this._scrollMode === ScrollMode.VERTICAL &&
          this._spreadMode === SpreadMode.NONE
        ) {
          stillFullyVisible = true;
          break;
        }
      }
      if (!stillFullyVisible) {
        currentId = visiblePages[0].id;
      }
      this._setCurrentPageNumber(currentId);
    }
  }

  return { PDFViewer };
});
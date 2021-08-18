define([
  "./pdfjs_dev",
  "./ui_utils",
  "./annotation_layer_builder",
  "./text_layer_builder",
  "./pdf_link_service",
  "./download_manager",
  "./genericl10n",
  "./pdf_find_controller",
  "./pdf_history",
  "./pdf_page_view",
  "./pdf_single_page_viewer",
  "./pdf_viewer"
],function(
  PDFJSDev,
  ui_utils,
  annotation_layer_builder,
  text_layer_builder,
  pdf_link_service,
  download_manager,
  genericl10n,
  pdf_find_controller,
  pdf_history,
  pdf_page_view,
  pdf_single_page_viewer,
  pdf_viewer
){
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

  const {
    AnnotationLayerBuilder,
    DefaultAnnotationLayerFactory,
  } = annotation_layer_builder;
  const {
    DefaultTextLayerFactory,
    TextLayerBuilder,
  } = text_layer_builder;
  const { EventBus, NullL10n, ProgressBar } = ui_utils;
  const { PDFLinkService, SimpleLinkService } = pdf_link_service;
  const { DownloadManager } = download_manager;
  const { GenericL10n } = genericl10n;
  const { PDFFindController } = pdf_find_controller;
  const { PDFHistory } = pdf_history;
  const { PDFPageView } = pdf_page_view;
  const { PDFSinglePageViewer } = pdf_single_page_viewer;
  const { PDFViewer } = pdf_viewer;

  // eslint-disable-next-line no-unused-vars
  const pdfjsVersion = PDFJSDev.eval("BUNDLE_VERSION");
  // eslint-disable-next-line no-unused-vars
  const pdfjsBuild = PDFJSDev.eval("BUNDLE_BUILD");

  return {
    AnnotationLayerBuilder,
    DefaultAnnotationLayerFactory,
    DefaultTextLayerFactory,
    DownloadManager,
    EventBus,
    GenericL10n,
    NullL10n,
    PDFFindController,
    PDFHistory,
    PDFLinkService,
    PDFPageView,
    PDFSinglePageViewer,
    PDFViewer,
    ProgressBar,
    SimpleLinkService,
    TextLayerBuilder,
  };
});
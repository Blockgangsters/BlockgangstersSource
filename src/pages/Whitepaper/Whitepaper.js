import React, { useState } from 'react';
import { PDFContainer, TextBox, PDFBox } from './Whitepaper.elements';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { PageWrapper } from '../../globalStyles'


const Whitepaper = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }


  return (

    <PageWrapper>
      <PDFContainer>
        <>
          <TextBox>
            <p>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
          </TextBox>
          <PDFBox>
            <Document
              file='Whitepaper.pdf'
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />

            </Document>
          </PDFBox>

        </>
      </PDFContainer>
    </PageWrapper>
  )
}

export default Whitepaper
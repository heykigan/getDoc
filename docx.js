    var docx = require('docx');
    var data = require('./data');
    var _ = require('lodash');

    function breakParagraph(doc) {
        var text = new docx.TextRun("");
        var paragraph = new docx.Paragraph(text.break());
        doc.addParagraph(paragraph)
    }

    function dataLoop(data, doc) {
        if (_.isObject(data)) {

            _.each(data, function(value, key) {
                if (_.isObject(value)) {
                    breakParagraph(doc);
                    dataLoop(value, doc);
                } else {
                    if (_.isString(key)) {
                        var text = new docx.TextRun(value).tab();
                        var paragraph = new docx.Paragraph(key);
                        // paragraph.addRun(text.tab());
                        doc.addParagraph(paragraph);
                    }

                    dataLoop(value, doc);
                }
            })

        } else if (_.isArray(data)) {
            _.each(data, function(value, key) {
                if (_.isObject(value)) {
                    // breakParagraph(doc);
                    dataLoop(value, doc);
                } else {
                    // var text = new docx.TextRun(value);
                    var paragraph = new docx.Paragraph(value);
                    doc.addParagraph(paragraph);
                }
            })

        } else {
            var paragraph = new docx.Paragraph(data);
            doc.addParagraph(paragraph.bullet());
        }

    }


    const getDoc = (isPdf = false) => {

        var doc = new docx.Document();

        _.each(data.Data, function(value, key) {

            var paragraph = new docx.Paragraph(key.toUpperCase());
            doc.addParagraph(paragraph.title());
            dataLoop(value, doc);


        })

        var exporter = new docx.LocalPacker(doc);

        if (isPdf) {
            exporter.packPdf('cv');
        } else {
            exporter.pack('CV');
        }

        // console.log('Document created successfully');

    };

    module.exports = { getDoc };
import fs from 'fs/promises'
import {TemplateParser} from './TemplateParser'
import {minify} from 'html-minifier'

export const TemplateRenderer = async (filePath: string, options: any, callback: any) => {

    try {
        const file =  await fs.readFile(filePath)
        const renderedString = new TemplateParser().render(minify(file.toString(),{
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true,
            maxLineLength: 10000
        }
            ), options)

            return callback(null, renderedString)
        
    } catch (err) {
        throw new ReferenceError(err)
    }

}


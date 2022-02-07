/* eslint import/no-default-export: 0 */

import type {SettingsSingleton as SettingsSingletonProps} from '@cms/types/sanityTypes'
import {getClient} from '@cms/utils/getClient'
import preval from 'next-plugin-preval'


const LINK_PROJECTION = `
    ...,
    destination {
        ...,
        internalPageReference->
    }
`

const settingsSingletonQuery = `*[_type == "settingsSingleton"][0]{
    ...,
    headerNavigation[] {
        ${LINK_PROJECTION}
    },
    footerCta {
        ...,
        ctaLink {
            ${LINK_PROJECTION}
        }
    },
    footerNavigation[] {
        ${LINK_PROJECTION}
    },
    policies[] {
        ${LINK_PROJECTION}
    }
}`

const getSiteSettings = async (): Promise<SettingsSingletonProps> => {
   const siteConfig = await getClient().fetch<SettingsSingletonProps>(settingsSingletonQuery)

   if (!siteConfig) throw new Error('Preval: no site config fetched from Sanity.');

   return siteConfig
  }

export default preval(getSiteSettings())

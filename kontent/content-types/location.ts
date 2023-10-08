import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
/**
 * Generated by '@kontent-ai/model-generator@6.5.0'
 *
 * Location
 * Id: 7a7d19cf-692d-4f14-ad23-f0b43f187854
 * Codename: location
 */
export type Location = IContentItem<{
    /**
     * GPS coordinates (text)
     * Required: false
     * Id: c41469ae-4b42-4544-b051-d9e4dbd84449
     * Codename: gps_coordinates
     */
    gps_coordinates: Elements.TextElement;

    /**
     * Name (text)
     * Required: true
     * Id: f8dceac8-ffa0-40e6-8135-67a48c2a1dac
     * Codename: name
     */
    name: Elements.TextElement;
}>;
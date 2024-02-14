//
//  AppIntent.swift
//  MessLiveActivity
//
//  Created by Tim Lee on 2/10/24.
//

import WidgetKit
import AppIntents

struct ConfigurationAppIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Configuration"
    static var description = IntentDescription("This is an example widget.")

    // An example configurable parameter.
    @Parameter(title: "Favorite Emoji", default: "😃")
    var favoriteEmoji: String
    @Parameter(title: "Test Options", default: "Test")
    var testOptions: String
}

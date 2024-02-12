//
//  MessLiveActivityLiveActivity.swift
//  MessLiveActivity
//
//  Created by Tim Lee on 2/10/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct MessLiveActivityLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: MessLiveActivityAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .padding()
            .activityBackgroundTint(Color.black.opacity(0.25))
            .activitySystemActionForegroundColor(Color.white)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension MessLiveActivityAttributes {
    fileprivate static var preview: MessLiveActivityAttributes {
        MessLiveActivityAttributes(name: "World")
    }
}

extension MessLiveActivityAttributes.ContentState {
    fileprivate static var smiley: MessLiveActivityAttributes.ContentState {
        MessLiveActivityAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: MessLiveActivityAttributes.ContentState {
         MessLiveActivityAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: MessLiveActivityAttributes.preview) {
   MessLiveActivityLiveActivity()
} contentStates: {
    MessLiveActivityAttributes.ContentState.smiley
    MessLiveActivityAttributes.ContentState.starEyes
}
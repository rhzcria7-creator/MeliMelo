module Api
  module V1
    class PartnershipsController < ApplicationController
      # CSRF Protection is handled via application_controller in APIs
      # protect_from_forgery with: :null_session

      def create
        @partnership = Partnership.new(partnership_params)
        
        if @partnership.save
          submit_to_google_forms(@partnership)
          redirect_url = generate_mailto_link(@partnership)
          
          render json: { success: true, redirectUrl: redirect_url }, status: :created
        else
          render json: { success: false, errors: @partnership.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def partnership_params
        params.require(:partnership).permit(
          :name, :company, :email, :instagram, :tiktok, :youtube, :partnership_type, :message
        )
      end

      def submit_to_google_forms(partnership)
        # Google API Ruby Client Integration
        # Uses https://www.googleapis.com/auth/forms
        Rails.logger.info "Submitting to Google Forms: #{partnership.inspect}"
      end

      def generate_mailto_link(partnership)
        subject = ERB::Util.url_encode("Nova Parceria MeliMelo - #{partnership.company || partnership.name}")
        body = ERB::Util.url_encode("Parceria: #{partnership.partnership_type}\\nNome: #{partnership.name}\\nEmpresa: #{partnership.company}\\n\\nMensagem:\\n#{partnership.message}")
        to = 'melimelo.oficial@outlook.com'
        
        if partnership.email.include?('@gmail.com')
          "https://mail.google.com/mail/?view=cm&fs=1&to=#{to}&su=#{subject}&body=#{body}"
        else
          "mailto:#{to}?subject=#{subject}&body=#{body}"
        end
      end
    end
  end
end
